// ====================================================================================
// DÉBUT DE LA BIBLIOTHÈQUE QRCODE.MIN.JS
// Il est impératif que ce bloc de code soit au tout début du fichier.
// ====================================================================================

var QRCode=function(){"use strict";var t=function(){function t(t,e){if(this.typeNumber=t,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[],"string"==typeof arguments[2]){this.dataList.push(arguments[2]);var r=arguments[3];r&&(this.errorCorrectLevel=r)}}t.prototype={addData:function(t){this.dataList.push(t),this.dataCache=null},isDark:function(t,e){if(t<0||this.moduleCount<=t||e<0||this.moduleCount<=e)throw new Error(t+","+e);return this.modules[t][e]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(e,r){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var n=0;n<this.moduleCount;n++)this.modules[n]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(e,r),7<=this.typeNumber&&this.setupTypeNumber(e),null==this.dataCache&&(this.dataCache=t.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,r)},setupPositionProbePattern:function(t,e){for(var r=-1;r<=7;r++)if(!(t+r<=-1||this.moduleCount<=t+r))for(var n=-1;n<=7;n++)e+n<=-1||this.moduleCount<=e+n||(0<=r&&r<=6&&(0==n||6==n)||0<=n&&n<=6&&(0==r||6==r)||2<=r&&r<=4&&2<=n&&n<=4?this.modules[t+r][e+n]=!0:this.modules[t+r][e+n]=!1)},getBestMaskPattern:function(){for(var t=0,e=0,r=0;r<8;r++){this.makeImpl(!0,r);var n=o.getLostPoint(this);(0==r||t>n)&&(t=n,e=r)}return e},createMovieClip:function(t,e,r){var n=t.createEmptyMovieClip(e,r),i=1;this.make();for(var o=0;o<this.moduleCount;o++){var a=o*i;for(var s=0;s<this.moduleCount;s++){var u=s*i,h=this.modules[o][s];h&&(n.beginFill(0,100),n.moveTo(u,a),n.lineTo(u+i,a),n.lineTo(u+i,a+i),n.lineTo(u,a+i),n.endFill())}}return n},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0);for(var e=8;e<this.moduleCount-8;e++)null==this.modules[6][e]&&(this.modules[6][e]=e%2==0)},setupPositionAdjustPattern:function(){for(var t=o.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var r=0;r<t.length;r++){var n=t[e],i=t[r];if(null==this.modules[n][i])for(var a=-2;a<=2;a++)for(var s=-2;s<=2;s++)-2==a||2==a||-2==s||2==s||0==a&&0==s?this.modules[n+a][i+s]=!0:this.modules[n+a][i+s]=!1}},setupTypeNumber:function(t){for(var e=o.getBCHTypeNumber(this.typeNumber),r=0;r<18;r++){var n=!t&&1==(e>>r&1);this.modules[Math.floor(r/3)][r%3+this.moduleCount-8-3]=n}for(r=0;r<18;r++){n=!t&&1==(e>>r&1);this.modules[r%3+this.moduleCount-8-3][Math.floor(r/3)]=n}},setupTypeInfo:function(t,e){for(var r=this.errorCorrectLevel<<3|e,n=o.getBCHTypeInfo(r),i=0;i<15;i++){var a=!t&&1==(n>>i&1);i<6?this.modules[i][8]=a:i<8?this.modules[i+1][8]=a:this.modules[this.moduleCount-15+i][8]=a}for(i=0;i<15;i++){a=!t&&1==(n>>i&1);i<8?this.modules[8][this.moduleCount-i-1]=a:i<9?this.modules[8][15-i-1+1]=a:this.modules[8][15-i-1]=a}this.modules[this.moduleCount-8][8]=!t},mapData:function(t,e){for(var r=-1,n=this.moduleCount-1,i=7,a=0,s=this.moduleCount-1;0<s;s-=2)for(6==s&&s--;;){for(var u=0;u<2;u++){if(null==this.modules[n][s-u]){var h=!1;a<t.length&&(h=1==(t[a]>>>i&1));o.getMask(e,n,s-u)&&(h=!h),this.modules[n][s-u]=h,i--,-1==i&&(a++,i=7)}}if((n+=r)<0||this.moduleCount<=n){n-=r,r=-r;break}}}},t.PAD0=236,t.PAD1=17,t.createData=function(e,r,n){for(var i=a.getRSBlocks(e,r),s=new u,c=0;c<n.length;c++){var l=n[c];s.put(o.stringToBytes(l).length,8),s.putBytes(o.stringToBytes(l))}var d=0;for(c=0;c<i.length;c++)d+=i[c].dataCount;if(s.getLengthInBits()>8*d)throw new Error("code length overflow. ("+s.getLengthInBits()+">"+8*d+")");for(s.getLengthInBits()+4<=8*d&&s.put(0,4);s.getLengthInBits()%8!=0;)s.putBit(!1);for(;!(s.getLengthInBits()>=8*d);){if(s.put(t.PAD0,8),s.getLengthInBits()>=8*d)break;s.put(t.PAD1,8)}return t.createBytes(s,i)},t.createBytes=function(t,e){for(var r=0,n=0,i=0,a=new Array(e.length),s=new Array(e.length),u=0;u<e.length;u++){var h=e[u].dataCount,f=e[u].totalCount-h;n=Math.max(n,h),i=Math.max(i,f),a[u]=new Array(h);for(var g=0;g<a[u].length;g++)a[u][g]=255&t.buffer[g+r];r+=h;var v=o.getErrorCorrectPolynomial(f),p=new c(a[u],v.getLength()-1).mod(v);s[u]=new Array(v.getLength()-1);for(g=0;g<s[u].length;g++){var m=g+p.getLength()-s[u].length;s[u][g]=0<=m?p.get(m):0}}var w=0;for(g=0;g<e.length;g++)w+=e[g].totalCount;var E=new Array(w),b=0;for(g=0;g<n;g++)for(u=0;u<e.length;u++)g<a[u].length&&(E[b++]=a[u][g]);for(g=0;g<i;g++)for(u=0;u<e.length;u++)g<s[u].length&&(E[b++]=s[u][g]);return E};var e={L:1,M:0,Q:3,H:2};function r(){}r.prototype={get:function(t){var e=this.string.charCodeAt(t);if(e<128)return[e];var r=this.string.charCodeAt(t+1);if(e<2048)return[192|e>>6,128|6
*/

// COLLEZ LE CODE DE LA BIBLIOTHÈQUE CI-DESSUS

// --------------- Notre code applicatif ---------------

document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrCodeContainer = document.getElementById('qrcode');

    // Initialise l'objet QR Code une seule fois
    const qrCode = new QRCode(qrCodeContainer, {
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    const generateQRCode = () => {
        const url = urlInput.value.trim();
        if (url) {
            qrCode.makeCode(url);
        } else {
            // Optionnel : Gérer le cas où l'input est vide
            alert("Veuillez entrer une URL valide.");
        }
    };

    // Générer le QR code au clic sur le bouton
    generateBtn.addEventListener('click', generateQRCode);

    // Optionnel : Générer le QR code en appuyant sur "Entrée"
    urlInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            generateQRCode();
        }
    });
});
