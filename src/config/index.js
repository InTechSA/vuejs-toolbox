export default {
  serverURI: process.env.SERVER_URI || 'http://localhost:7000',
  domain: process.env.DOMAIN || 'http://localhost:8080',
  webSocketServer: process.env.WEB_SOCKET_SERVER || 'ws://localhost:7000/websocket',
  fixedLayout: false,
  hideLogoOnMobile: false
}
