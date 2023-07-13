const tlLeave = gsap.timeline({ defaults: { duration: 0.75, ease: 'Power2.easeOut' } });
const tlEnter = gsap.timeline({ defaults: { duration: 0.75, ease: 'Power2.easeOut' } });

//Functions for the leave and enter animations
const leaveAnimation = (current, done) => {
	const product = current.querySelector('.image-container');
	const text = current.querySelector('.showcase-text');
	const circles = current.querySelectorAll('.circle');
	const arrow = current.querySelector('.showcase-arrow');
	return (
		tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
		tlLeave.fromTo(product, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, '<'),
		tlLeave.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: 100, onComplete: done }, '<'),
		tlLeave.fromTo(
			circles,
			{ opacity: 1, y: 0 },
			{ opacity: 0, y: -200, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 },
			'<'
		)
	);
};
const enterAnimation = (current, done, gradient) => {
	const product = current.querySelector('.image-container');
	const text = current.querySelector('.showcase-text');
	const circles = current.querySelectorAll('.circle');
	const arrow = current.querySelector('.showcase-arrow');
	return (
		tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
		tlEnter.to('body', { background: gradient }, '<'),
		tlEnter.fromTo(product, { opacity: 0, y: -100 }, { opacity: 1, y: 0 }, '<'),
		tlEnter.fromTo(text, { opacity: 0, y: 100 }, { opacity: 1, y: 0, onComplete: done }, '<'),
		tlEnter.fromTo(
			circles,
			{ opacity: 0, y: -200 },
			{ opacity: 1, y: 0, stagger: 0.15, ease: 'back.out(1.7)', duration: 1 },
			'<'
		)
	);
};

//Run animations

barba.init({
	preventRunning: true,
	transitions: [
		//Showcase transitions
		{
			name: 'default',
			once(data) {
				const done = this.async();
				let next = data.next.container;
				let gradient = getGradient(data.next.namespace);
				gsap.set('body', { background: gradient });
				enterAnimation(next, done, gradient);
			},

			leave(data) {
				const done = this.async();
				let current = data.current.container;
				leaveAnimation(current, done);
			},
			enter(data) {
				const done = this.async();
				let next = data.next.container;
				let gradient = getGradient(data.next.namespace);
				enterAnimation(next, done, gradient);
			},
		},
		//Product page animation
		{
			name: 'product-transition',
			sync: true,
			from: { namespace: ['handbag', 'product'] },
			to: { namespace: ['product', 'handbag'] },
			once(data) {
				const done = this.async();
				let next = data.next.container;
				let gradient = getGradient(data.next.namespace);
				gsap.set('body', { background: gradient });
				enterAnimation(next, done, gradient);
			},
			enter(data) {
				const done = this.async();
				let next = data.next.container;
				productEnterAnimation(next, done);
			},
			leave(data) {
				const done = this.async();
				let current = data.current.container;
				productLeaveAnimation(current, done);
			},
		},
	],
});

//Changing gradient on showcase
function getGradient(name) {
	switch (name) {
		case 'handbag':
			return 'linear-gradient(260deg, #b75d62, #754d4f)';
		case 'boot':
			return 'linear-gradient(260deg, #5d8cb7, #4c4f70)';
		case 'hat':
			return 'linear-gradient(260deg, #b27a5c, #7f5459)';
	}
}

//Product Enter Animation
function productEnterAnimation(next, done) {
	tlEnter.fromTo(next, { y: '100%' }, { y: '0%' });
	tlEnter.fromTo('.card', { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1, onComplete: done });
}
function productLeaveAnimation(current, done) {
	tlLeave.fromTo(current, { y: '0%' }, { y: '100%', onComplete: done });
}
