'use strict';

var scrollspy = function (els, conf) {
	conf = conf || {};

	var elements = typeof els == 'string' ? document.querySelectorAll(els) : els;
	var numElements = elements.length;
	var config = {
		offset: conf.offset || 0
	};

	// https://github.com/makotot/scrollspy/blob/master/src/js/modules/scrollspy.js
	var isInView = function (el) {
		var winH = window.innerHeight,
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
			scrollBottom = scrollTop + winH,
			rect = el.getBoundingClientRect(),
			elTop = rect.top + scrollTop,
			elBottom = elTop + el.offsetHeight;

		return ((elTop + config.offset) < scrollBottom) && (elBottom > scrollTop);
	};

	var spy = function () {
		for (var i = 0; i < numElements; i++) {
			if (isInView(elements[i])) {
				elements[i].classList.add('in-view');
				elements[i].classList.add('was-in-view');
			}
			else {
				elements[i].classList.remove('in-view');
			}
		}
	};

	var onScroll = function () {
		window.requestAnimationFrame(function () {
			spy();
		});
	};

	window.addEventListener('scroll', onScroll);

	spy();
};

if (module && module.exports) {
	module.exports = scrollspy;
}
