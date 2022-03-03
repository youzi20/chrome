var InjectedScript = function () {
    this.selectDom = null;
    this.maskDiv = null;

    this.data = {
        text: null,
        images: null
    }

    this.eventListener();
}

InjectedScript.prototype.getText = function () {
    this.data.text = this.selectDom.innerText;
}

InjectedScript.prototype.getImages = function () {
    const images = [];
    const nodes = this.selectDom.querySelectorAll("img");

    nodes.forEach(item => {
        images.push({
            src: item.src
        })
    });

    this.data.images = [...images];
}

InjectedScript.prototype.createMask = function () {
    if (!this.selectDom) return;

    const { left, top, width, height } = this.selectDom.getBoundingClientRect();

    if (!this.maskDiv) {
        this.maskDiv = document.createElement("div");
        this.maskDiv.style = "position: fixed; background: rgba(24, 112, 240, 0.5);pointer-events: none;z-index: 9999999;";
        document.body.appendChild(this.maskDiv);
    }

    this.maskDiv.style.width = width + "px";
    this.maskDiv.style.height = height + "px";
    this.maskDiv.style.top = top + "px";
    this.maskDiv.style.left = left + "px";
}

InjectedScript.prototype.onMouseMoveHandle = function (e) {
    const { clientX, clientY } = e;

    const element = document.elementFromPoint(clientX, clientY);

    if (this.selectDom && this.selectDom === element) return;

    this.selectDom = element;

    this.createMask();
}

InjectedScript.prototype.onClickHandle = function (e) {
    this.getText();
    this.getImages();

    window.postMessage({ ticker: "document-injected-script", data: this.data }, '*');
    this.dispose();
}

InjectedScript.prototype.eventListener = function () {
    this._onMouseMoveHandle = this.onMouseMoveHandle.bind(this);
    this._onClickHandle = this.onClickHandle.bind(this);

    window.addEventListener("mousemove", this._onMouseMoveHandle);
    window.addEventListener("click", this._onClickHandle);
}

InjectedScript.prototype.dispose = function () {
    InjectedScript = null;
    this.maskDiv.remove();
    window.removeEventListener("mousemove", this._onMouseMoveHandle);
    window.removeEventListener("click", this._onClickHandle);
}

new InjectedScript();