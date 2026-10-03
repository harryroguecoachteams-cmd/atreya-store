"""Serves dist/ the way the live .htaccess does: /x -> x.html when that file
exists, real files as-is, anything else -> index.html. vite preview cannot do
this (it answers every path with index.html), so it cannot test hydration of
the prerendered snapshots. Usage: python scripts/_serve.py [port]"""
import gzip
import mimetypes
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=DIST, **kw)

    def log_message(self, *a):
        pass

    def send_file(self, rel):
        full = os.path.join(DIST, rel.lstrip('/'))
        data = open(full, 'rb').read()
        ctype = mimetypes.guess_type(full)[0] or 'application/octet-stream'
        self.send_response(200)
        self.send_header('Content-Type', ctype)
        # The live host compresses text, so the test server must too or every
        # Lighthouse number is skewed by an uncompressed bundle.
        if ctype.startswith(('text/', 'application/javascript', 'application/json', 'image/svg')) and 'gzip' in self.headers.get('Accept-Encoding', ''):
            data = gzip.compress(data)
            self.send_header('Content-Encoding', 'gzip')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = self.path.split('?')[0].rstrip('/') or '/'
        full = os.path.join(DIST, path.lstrip('/'))
        if path == '/':
            return self.send_file('/index.html')
        if os.path.isfile(full):
            return self.send_file(path)
        if os.path.isfile(full + '.html'):
            return self.send_file(path + '.html')
        return self.send_file('/index.html')


port = int(sys.argv[1]) if len(sys.argv) > 1 else 4192
# The default backlog of 5 makes Windows refuse connections when a page opens
# many at once, which shows up as random broken images that are not site bugs.
ThreadingHTTPServer.request_queue_size = 128
ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
