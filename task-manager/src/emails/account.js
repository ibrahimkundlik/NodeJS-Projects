const sgMail = require("@sendgrid/mail");

const sendgridKey =
	"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";

sgMail.setApiKey(sendgridKey);

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
