/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGame": () => (/* binding */ createGame),
/* harmony export */   "createScore": () => (/* binding */ createScore),
/* harmony export */   "refreshScores": () => (/* binding */ refreshScores)
/* harmony export */ });
/* harmony import */ var _APIHandling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const createGame = async () => {
  const namedId = await (0,_APIHandling_js__WEBPACK_IMPORTED_MODULE_0__.postGame)();
  const reGex = /(?<=Game with ID: ).+(?= )/gi;
  const id = namedId.result.match(reGex)[0];
  return id;
};

const createScore = async (id, score) => {
  const message = await (0,_APIHandling_js__WEBPACK_IMPORTED_MODULE_0__.postScore)(id, score);
  const form = document.querySelector('form');
  const span = document.createElement('span');

  span.textContent = message.result;
  form.appendChild(span);
};

const refreshScores = async (id) => {
  const data = await (0,_APIHandling_js__WEBPACK_IMPORTED_MODULE_0__.getScore)(id);
  data.result = data.result.sort((userA, userB) => userB.score - userA.score);
  const nodes = [];
  data.result.forEach((leader) => {
    const leaderCard = document.createElement('li');
    leaderCard.textContent = `${leader.user}: ${leader.score}`;
    nodes.push(leaderCard);
  });
  return nodes;
};




/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postGame": () => (/* binding */ postGame),
/* harmony export */   "postScore": () => (/* binding */ postScore),
/* harmony export */   "getScore": () => (/* binding */ getScore)
/* harmony export */ });
const postGame = async () => {
  const requestURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
  const result = await fetch(`${requestURL}/games`, {
    method: 'POST',
    body: JSON.stringify({
      name: 'John Francis Titor Leader Board',
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
  return result;
};

const postScore = async (id, score) => {
  const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const result = await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify(score),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
  return result;
};

const getScore = async (id) => {
  const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`;
  const result = await fetch(requestURL).then((response) => response.json());
  return result;
};



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_leaderboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



let id = '';
const form = document.querySelector('form');
const username = document.querySelector('#username');
const userscore = document.querySelector('#userscore');
const refreshButton = document.querySelector('#refreshButton');

const cleanSpan = () => {
  const span = form.querySelector('span');
  if (span) {
    form.removeChild(span);
  }
};

const displayLeaders = async () => {
  const leaderboard = document.querySelector('ul');
  const nodes = await (0,_modules_leaderboard_js__WEBPACK_IMPORTED_MODULE_1__.refreshScores)(id);
  if (nodes.length !== 0) {
    leaderboard.innerHTML = '';
    nodes.forEach((node) => {
      leaderboard.appendChild(node);
    });
  }
};

window.onload = async () => {
  if (!localStorage.getItem('idAPI')) {
    id = await (0,_modules_leaderboard_js__WEBPACK_IMPORTED_MODULE_1__.createGame)();
    localStorage.setItem('idAPI', id);
  } else {
    id = localStorage.getItem('idAPI');
    displayLeaders();
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const usernameValue = username.value.trim();
  const userscoreValue = userscore.value;

  if (usernameValue) {
    const score = {
      user: usernameValue,
      score: userscoreValue,
    };
    (0,_modules_leaderboard_js__WEBPACK_IMPORTED_MODULE_1__.createScore)(id, score);
    username.value = '';
    userscore.value = '';
  }
});

username.addEventListener('click', cleanSpan);
userscore.addEventListener('click', cleanSpan);

refreshButton.addEventListener('click', displayLeaders);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FDQWlFOztBQUVqRTtBQUNBLHdCQUF3Qix5REFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwwREFBUztBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQix5REFBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxZQUFZLElBQUksYUFBYTtBQUM3RDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVrRDs7Ozs7Ozs7Ozs7OztBQzlCbEQ7QUFDQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHlDQUF5QztBQUN6QyxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZGQUE2RixHQUFHO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkZBQTZGLEdBQUc7QUFDaEc7QUFDQTtBQUNBOzs7Ozs7O1VDaENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7O0FDTjRCO0FBQ3NEOztBQUVsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLHNFQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsbUVBQVU7QUFDekI7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG9FQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBLHdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvc3R5bGVzL21haW4uc2Nzcz80YzU1Iiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvbGVhZGVyYm9hcmQuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9BUElIYW5kbGluZy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBwb3N0R2FtZSwgcG9zdFNjb3JlLCBnZXRTY29yZSB9IGZyb20gJy4vQVBJSGFuZGxpbmcuanMnO1xuXG5jb25zdCBjcmVhdGVHYW1lID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBuYW1lZElkID0gYXdhaXQgcG9zdEdhbWUoKTtcbiAgY29uc3QgcmVHZXggPSAvKD88PUdhbWUgd2l0aCBJRDogKS4rKD89ICkvZ2k7XG4gIGNvbnN0IGlkID0gbmFtZWRJZC5yZXN1bHQubWF0Y2gocmVHZXgpWzBdO1xuICByZXR1cm4gaWQ7XG59O1xuXG5jb25zdCBjcmVhdGVTY29yZSA9IGFzeW5jIChpZCwgc2NvcmUpID0+IHtcbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHBvc3RTY29yZShpZCwgc2NvcmUpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gIHNwYW4udGV4dENvbnRlbnQgPSBtZXNzYWdlLnJlc3VsdDtcbiAgZm9ybS5hcHBlbmRDaGlsZChzcGFuKTtcbn07XG5cbmNvbnN0IHJlZnJlc2hTY29yZXMgPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFNjb3JlKGlkKTtcbiAgZGF0YS5yZXN1bHQgPSBkYXRhLnJlc3VsdC5zb3J0KCh1c2VyQSwgdXNlckIpID0+IHVzZXJCLnNjb3JlIC0gdXNlckEuc2NvcmUpO1xuICBjb25zdCBub2RlcyA9IFtdO1xuICBkYXRhLnJlc3VsdC5mb3JFYWNoKChsZWFkZXIpID0+IHtcbiAgICBjb25zdCBsZWFkZXJDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBsZWFkZXJDYXJkLnRleHRDb250ZW50ID0gYCR7bGVhZGVyLnVzZXJ9OiAke2xlYWRlci5zY29yZX1gO1xuICAgIG5vZGVzLnB1c2gobGVhZGVyQ2FyZCk7XG4gIH0pO1xuICByZXR1cm4gbm9kZXM7XG59O1xuXG5leHBvcnQgeyBjcmVhdGVHYW1lLCBjcmVhdGVTY29yZSwgcmVmcmVzaFNjb3JlcyB9O1xuIiwiY29uc3QgcG9zdEdhbWUgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHJlcXVlc3RVUkwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1qcy1jYXBzdG9uZS1iYWNrZW5kLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGknO1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaChgJHtyZXF1ZXN0VVJMfS9nYW1lc2AsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBuYW1lOiAnSm9obiBGcmFuY2lzIFRpdG9yIExlYWRlciBCb2FyZCcsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IHBvc3RTY29yZSA9IGFzeW5jIChpZCwgc2NvcmUpID0+IHtcbiAgY29uc3QgcmVxdWVzdFVSTCA9IGBodHRwczovL3VzLWNlbnRyYWwxLWpzLWNhcHN0b25lLWJhY2tlbmQuY2xvdWRmdW5jdGlvbnMubmV0L2FwaS9nYW1lcy8ke2lkfS9zY29yZXNgO1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaChyZXF1ZXN0VVJMLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2NvcmUpLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBnZXRTY29yZSA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCByZXF1ZXN0VVJMID0gYGh0dHBzOi8vdXMtY2VudHJhbDEtanMtY2Fwc3RvbmUtYmFja2VuZC5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpL2dhbWVzLyR7aWR9L3Njb3Jlc2A7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKHJlcXVlc3RVUkwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IHsgcG9zdEdhbWUsIHBvc3RTY29yZSwgZ2V0U2NvcmUgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZXMvbWFpbi5zY3NzJztcbmltcG9ydCB7IGNyZWF0ZUdhbWUsIGNyZWF0ZVNjb3JlLCByZWZyZXNoU2NvcmVzIH0gZnJvbSAnLi9tb2R1bGVzL2xlYWRlcmJvYXJkLmpzJztcblxubGV0IGlkID0gJyc7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXNlcm5hbWUnKTtcbmNvbnN0IHVzZXJzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1c2Vyc2NvcmUnKTtcbmNvbnN0IHJlZnJlc2hCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVmcmVzaEJ1dHRvbicpO1xuXG5jb25zdCBjbGVhblNwYW4gPSAoKSA9PiB7XG4gIGNvbnN0IHNwYW4gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgaWYgKHNwYW4pIHtcbiAgICBmb3JtLnJlbW92ZUNoaWxkKHNwYW4pO1xuICB9XG59O1xuXG5jb25zdCBkaXNwbGF5TGVhZGVycyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbGVhZGVyYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBjb25zdCBub2RlcyA9IGF3YWl0IHJlZnJlc2hTY29yZXMoaWQpO1xuICBpZiAobm9kZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgbGVhZGVyYm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbGVhZGVyYm9hcmQuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkQVBJJykpIHtcbiAgICBpZCA9IGF3YWl0IGNyZWF0ZUdhbWUoKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRBUEknLCBpZCk7XG4gIH0gZWxzZSB7XG4gICAgaWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRBUEknKTtcbiAgICBkaXNwbGF5TGVhZGVycygpO1xuICB9XG59O1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHVzZXJuYW1lVmFsdWUgPSB1c2VybmFtZS52YWx1ZS50cmltKCk7XG4gIGNvbnN0IHVzZXJzY29yZVZhbHVlID0gdXNlcnNjb3JlLnZhbHVlO1xuXG4gIGlmICh1c2VybmFtZVZhbHVlKSB7XG4gICAgY29uc3Qgc2NvcmUgPSB7XG4gICAgICB1c2VyOiB1c2VybmFtZVZhbHVlLFxuICAgICAgc2NvcmU6IHVzZXJzY29yZVZhbHVlLFxuICAgIH07XG4gICAgY3JlYXRlU2NvcmUoaWQsIHNjb3JlKTtcbiAgICB1c2VybmFtZS52YWx1ZSA9ICcnO1xuICAgIHVzZXJzY29yZS52YWx1ZSA9ICcnO1xuICB9XG59KTtcblxudXNlcm5hbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhblNwYW4pO1xudXNlcnNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xlYW5TcGFuKTtcblxucmVmcmVzaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlMZWFkZXJzKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=