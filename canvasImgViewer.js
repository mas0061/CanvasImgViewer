var CanvasImgViewer = function(id, imgSrc) {
	this.canvas = document.getElementById(id);
	this.cnvsWidth = this.canvas.clientWidth;
	this.cnvsHeight = this.canvas.clientHeight;
	this.zoomFactor = 0.2;

	var ctx = this.canvas.getContext('2d');
	var img = new Image();
	img.src = imgSrc;
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		ctx.save();
	};

	this.ctx = ctx;
	this.img = img;
};

CanvasImgViewer.prototype.restore = function() {
	this.clearCanvas();
	this.ctx.restore();
	this.ctx.drawImage(this.img, 0, 0);
	this.ctx.save();
};

CanvasImgViewer.prototype.fill = function() {
	var factors = (function(img, cnvsW, cnvsH) {
		var imgW = img.width;
		var imgH = img.height;
		var factor = imgW >= imgH ? factor = cnvsW / imgW : factor = cnvsH / imgH;

		return { width: imgW * factor, height: imgH * factor};
	})(this.img, this.cnvsWidth, this.cnvsHeight);

	this.clearCanvas();
	this.ctx.drawImage(this.img, 0, 0, factors.width, factors.height);
};

CanvasImgViewer.prototype.clearCanvas = function(cnvsW, cnvsH) {
	this.ctx.putImageData(this.ctx.createImageData(this.cnvsWidth, this.cnvsHeight), 0, 0);
	// this.ctx.clearRect(0, 0, this.cnvsWidth, this.cnvsHeight);
};

CanvasImgViewer.prototype.rotateCommon = function(dig) {
	this.clearCanvas();
	this.ctx.translate(this.img.width / 2, this.img.height / 2);
	this.ctx.rotate(dig * Math.PI / 180);
	this.ctx.translate(-1 * this.img.width / 2, -1 * this.img.height / 2);
	this.ctx.drawImage(this.img, 0, 0);
};

CanvasImgViewer.prototype.rotateR = function() {
	this.rotateCommon(90);
};

CanvasImgViewer.prototype.rotateL = function() {
	this.rotateCommon(-90);
};

CanvasImgViewer.prototype.zoomCommon = function(scaleX, scaleY) {
	this.clearCanvas();
	this.ctx.scale(scaleX, scaleY);
	this.ctx.drawImage(this.img, 0, 0);
};

CanvasImgViewer.prototype.zoomIn = function() {
		this.zoomCommon(1 + this.zoomFactor, 1 + this.zoomFactor);
};

CanvasImgViewer.prototype.zoomOut = function() {
		this.zoomCommon(1 - this.zoomFactor, 1 - this.zoomFactor);
};

CanvasImgViewer.prototype.flipH = function() {
	this.clearCanvas();
	this.ctx.translate(this.img.width, 0);
	this.ctx.scale(-1, 1);
	this.ctx.drawImage(this.img, 0, 0);
};
