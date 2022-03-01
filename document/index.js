(() => {
    'use strict';

    let selectDom = null;
    let maskDiv = null;


    const init = () => {
        eventListener();
    }

    const createMask = (dom) => {
        if (!dom) return;

        const { left, top, width, height } = dom.getBoundingClientRect();

        if (!maskDiv) {
            maskDiv = document.createElement("div");
            maskDiv.style = "position: fixed; background: rgba(0, 0, 0, 0.5);pointer-events: none;z-index: 9999999;";
            document.body.appendChild(maskDiv);
        }

        maskDiv.style.width = width + "px";
        maskDiv.style.height = height + "px";
        maskDiv.style.top = top + "px";
        maskDiv.style.left = left + "px";
    }

    const onMouseMoveHandle = (e) => {
        const { pageX, pageY } = e;

        console.log(e);

        const element = document.elementFromPoint(pageX, pageY);

        createMask(element);
    }

    const eventListener = () => {
        window.addEventListener("mousemove", onMouseMoveHandle);
    }

    init();
})();

// 207, 232, 252



