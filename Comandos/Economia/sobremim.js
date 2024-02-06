const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name:"sobremim",
    description:"mude seu sobremim",
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name:"texto",
            description:`Oque você quer colocar no sobremim?`,
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, agrs) => {
        const txt = interaction.options.getString("texto")
        await db.set(`sobremim_${interaction.user.id}`, txt);

        interaction.reply({content:`✅ - Seu *Sobremim* foi alterado para **${txt}**`})
    }
}