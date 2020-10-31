class CommandUtils {
    getCommand(message) {
        const prefix = process.env.PREFIX;
        let command = message.split(" ")[0].toLowerCase();
        if (command.startsWith(prefix)) {
            command = command.slice(prefix.length);
            return command;
        }
        return "";
    }
}

export default new CommandUtils();