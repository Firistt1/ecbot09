const Discord = require("discord.js")

module.exports = {
    name:"premium",
    description:"veja os benefícios do Premium",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction, args ) => {
        let embedp = new Discord.EmbedBuilder()
        .setTitle("Seja Premium")
        .addFields(
            {
                name:`Beneficios`, value:`nada`
            }
        )

        const bt = new Discord.ButtonBuilder()
        .setCustomId('disabled')
	.setLabel('Ativar Premium')
    .setEmoji(`<:appdirectoryModerationTools:1203902062702764082>`)
	.setStyle(Discord.ButtonStyle.Primary)
	.setDisabled(true);

    const row = new Discord.ActionRowBuilder()
			.addComponents(bt);

        interaction.reply({embeds: [embedp], components: [row]})
    }
}