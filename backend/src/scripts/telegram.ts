import axios from "axios";

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_ID = process.env.TELEGRAM_ID;

export const sendTelegramError = async (errorMessage: string) => {
	try {
		const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
		const message = `🚨 *Bmore Today Backend Error* 🚨\n\n${errorMessage}`;

		await axios.post(url, {
			chat_id: TELEGRAM_ID,
			text: message,
			parse_mode: "Markdown"
		});
	} catch (error) {
		console.log("Failed to send Telegram error message:", error);
	}
};
