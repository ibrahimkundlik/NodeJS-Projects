const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "mackwils1997@gmail.com",
		subject: "WELCOME EMAIL :)",
		text: `Hi ${name}, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem nostrum eaque alias asperiores placeat, saepe eum cum sed, veniam modi maiores rerum laudantium culpa nobis, odit hic omnis. Nemo, veritatis.`,
	});
};

const cancelEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: "mackwils1997@gmail.com",
		subject: "GOODBYE EMAIL :(",
		text: `Hi ${name}, We will miss you !!!`,
	});
};

module.exports = {
	welcomeEmail,
	cancelEmail,
};
