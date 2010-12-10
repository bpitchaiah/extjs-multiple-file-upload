import twisted
import pprint

class Simple(twisted.web.resource.Resource):
    PP = pprint.PrettyPrinter(indent=4)

    def render_GET(self, request):
        request.redirect('/demo.html')
        request.finish()

    def render_POST(self, request):
        #return '<pre><code>%s</pre></code><a href="/">Back</a>' % self.PP.pformat(request.__dict__)
        return request.content.read()


resource = Simple()

#def main(argv=None):
#    site = server.Site(Simple())
#    reactor.listenTCP(8081, site)
#    reactor.run()
#
#
#if __name__ == '__main__':
#    main()
