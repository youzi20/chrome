(() => {
    'use strict';

    let page = {
        x: 0,
        y: 0
    };
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
            maskDiv.style = "position: fixed; background: rgba(24, 112, 240, 0.5);pointer-events: none;z-index: 9999999;";
            document.body.appendChild(maskDiv);
        }

        maskDiv.style.width = width + "px";
        maskDiv.style.height = height + "px";
        maskDiv.style.top = top + "px";
        maskDiv.style.left = left + "px";
    }

    const createContextMenu = () => {
// const div = document
    }

    const onMouseMoveHandle = (e) => {
        const { clientX, clientY } = e;

        const element = document.elementFromPoint(clientX, clientY);

        page = { x: clientX, y: clientY };

        if (selectDom && selectDom === element) return;

        selectDom = element;

        createMask(element);
    }

    const onClickHandle = (e) => {

    }

    const onContextmenuHandle = (e) => {

    }

    const eventListener = () => {
        window.addEventListener("mousemove", onMouseMoveHandle);
        window.addEventListener("click", onClickHandle);
        window.addEventListener("contextmenu", onContextmenuHandle)
    }

    init();
})();

// 207, 232, 252



