<template>
  <div class="iframe-container">
    <meta charset="utf-8">
    <link type="text/css" rel="stylesheet" href="https://dmogdx0jrul3u.cloudfront.net/1.3.7/css/bootstrap.css">
    <link
      type="text/css"
      rel="stylesheet"
      href="https://dmogdx0jrul3u.cloudfront.net/1.3.7/css/react-select.css"
    >

    <meta name="format-detection" content="telephone=no">
  </div>
</template>
<script>
import { ZoomMtg } from "zoomus-jssdk";

console.log("checkSystemRequirements");
console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// CDN version default
ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.3.7/lib', '/av'); 

ZoomMtg.preLoadWasm();

ZoomMtg.prepareJssdk();

var API_KEY = "NxgOR_8sShS6hc9RQcr9Ng";

var API_SECRET = "KBPrcxJXaHOwO3LPKPZRRCPoWLrwH7cNsYRV";

export default {
  name: "ZoomFrame",
  data: function() {
    return {
      src: "",
      meetConfig: {},
      signature: {}
    };
  },
  props: {
    nickname: String,
    meetingId: String
  },
  created: function() {
    // Meeting config object
    this.meetConfig = {
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      meetingNumber: this.meetingId,
      userName: this.nickname,
      passWord: "",
      leaveUrl: "https://zoom.us",
      role: 0
    };

    // Generate Signature function
    this.signature = ZoomMtg.generateSignature({
      meetingNumber: this.meetConfig.meetingNumber,
      apiKey: this.meetConfig.apiKey,
      apiSecret: this.meetConfig.apiSecret,
      role: this.meetConfig.role,
      success: function(res) {
        // eslint-disable-next-line
        console.log("success signature: " + res.result);
      }
    });

    // join function
    ZoomMtg.init({
      leaveUrl: "http://www.zoom.us",
      isSupportAV: true,
      success: () => {
        ZoomMtg.join({
          meetingNumber: this.meetConfig.meetingNumber,
          userName: this.meetConfig.userName,
          signature: this.signature,
          apiKey: this.meetConfig.apiKey,
          userEmail: "email@gmail.com",
          passWord: this.meetConfig.passWord,
          success: function(res) {
            // eslint-disable-next-line
            console.log("join meeting success");
          },
          error: function(res) {
            // eslint-disable-next-line
            console.log(res);
          }
        });
      },
      error: function(res) {
        // eslint-disable-next-line
        console.log(res);
      }
    });
  },
  mounted: function() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
