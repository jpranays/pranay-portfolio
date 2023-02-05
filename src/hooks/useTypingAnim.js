const ADDSPEED = 200;
const DELETESPEED = 200;
const PAUSETIME = 10;

export async function useTypingAnim(CONTENT, heroText) {
	let counter = 0;
	CONTENT = CONTENT.split(" ");
	for (let word of CONTENT) {
		let promise = new Promise((res, rej) => {
			let addTimer = setInterval(() => {
				let span = document.createElement("span");
				span.textContent = word[counter];
				heroText.appendChild(span);
				counter++;
				if (counter > word.length) {
					clearInterval(addTimer);
					counter = 0;
					setTimeout(() => {
						deletetext(res, heroText);
					}, PAUSETIME * word.length);
				}
			}, ADDSPEED);
		});
		await promise;
	}
	// for infinite loop
	useTypingAnim(CONTENT.join(" "), heroText);
}
async function deletetext(res, heroText) {
	let spans = heroText.querySelectorAll("span");
	let counter = spans.length - 1;
	let deleteTimer = setInterval(() => {
		spans[counter].remove();
		counter--;
		if (counter < 0) {
			clearInterval(deleteTimer);
			return res(true);
		}
	}, DELETESPEED);
}
