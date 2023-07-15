function submitForm(e) {
	e.preventDefault();
	getData(); 
}

async function getData() {
	let userData = document.getElementById("input").value.trim();
	if (userData === "") return false;

	document.getElementById("messages").innerHTML = `<div class="mess-user">
			<p>${userData}</p>
	</div>`+ document.getElementById("messages").innerHTML
	document.getElementById("input").value=""


	// const API = process.env.IP_KEY;
 try {
	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: 'gpt-3.5-turbo',
			messages: [{role: 'user', content: userData}],
			max_tokens: 1000

		})
	})
	const data = await response.json();

	document.getElementById("messages").innerHTML = `<div class="mess-chat">
	<p>${data.choices[0].message.content}</p>
</div>`+ document.getElementById("messages").innerHTML

	
} catch(error) {
	console.error('Error:', error);
}
}
