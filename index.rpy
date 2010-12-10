import twisted

class Simple(twisted.web.resource.Resource):
    def render_GET(self, request):
        return '''hello world'''

resource = Simple()

#def main(argv=None):
#    site = server.Site(Simple())
#    reactor.listenTCP(8081, site)
#    reactor.run()
#
#
#if __name__ == '__main__':
#    main()
