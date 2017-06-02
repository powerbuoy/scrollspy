'use strict';

var scrollspy = function (els, conf) {
	conf = conf || {};

	var elements = typeof els == 'string' ? document.querySelectorAll(els) : els;
	var numElements = elements.length;
	var config = {
		offset: conf.offset || 0,
		inView: conf.inView || function (el) {
			el.classList.add('in-view');
			el.classList.add('was-in-view');
		},
		outView: conf.outView || function (el) {
			el.classList.remove('in-view');
		}
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
				config.inView(elements[i]);
			}
			else {
				config.outView(elements[i]);
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
