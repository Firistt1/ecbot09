const Discord = require("discord.js")

module.exports = {
    name:"ajuda",
    description:"Veja minha lista de Comandos",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction, args ) => {
        let embedp = new Discord.EmbedBuilder()
        .setTitle("Comandos")
        .addFields(
            {
                name:`Economia`, value:`</daily:0> </work:0> </aventura:0>`,
                
            },
            {
                name:`Social`, value:`</perfil:0> </sobremim:0>`
            },
            {
                name:`Outros`, value:`</ativar-premium:0> </add-emblema:0>n `
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