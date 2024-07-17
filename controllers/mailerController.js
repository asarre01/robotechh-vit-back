const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "robotech@esp.sn",
    pass: "kxsadhalkrplbvtc",
  },
});


exports.sendMail = async (req, res) => {
	console.log(req.body);
	const { nom, email, sujet, message } = req.body;

	const mailOptionsClub = {
		from: 'robotech@esp.sn',
		to: 'robotech@esp.sn',
		subject: sujet,
		html: `
			<h1>${sujet}</h1>
			<p><strong>Nom:</strong> ${nom}</p>
			<p><strong>Email:</strong> ${email}</p>
			<p>${message}</p>`,
	};

	const mailOptionsVisitor = {
    from: "robotech@esp.sn",
    to: email,
    subject: "Merci pour votre message - Club Robotech ESP",
    html: `<h1>Merci pour votre message !</h1>
		<p>Bonjour,</p>
		<p>Nous tenons à vous remercier chaleureusement d'avoir pris contact avec le Club Robotech ESP. Votre message a bien été reçu et nous y répondrons dans les plus brefs délais.</p>
		<p>Votre intérêt pour notre club nous fait chaud au cœur et nous sommes ravis de pouvoir échanger avec vous.</p>
		<p>Bien cordialement,<br>L'équipe du Club Robotech ESP</p>`,
  };

	transporter.sendMail(mailOptionsClub, function (error, info) {
		if (error) {
			console.log(error);
			res.status(500).send('error');
		} else {
			console.log('Email sent to club: ' + info.response);
			transporter.sendMail(mailOptionsVisitor, function (error, info) {
				if (error) {
					console.log(error);
					res.status(500).send('error');
				} else {
					console.log('Email sent to visitor: ' + info.response);
					res.status(200).send('Email sent');
				}
			});
		}
	});
}
