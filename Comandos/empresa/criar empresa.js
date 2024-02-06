const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name:"criar-empresa",
    description:"Torne-se um CEO de uma empresa",
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name:"nome",
            description:"Qual será o nome da sua empresa?",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name:"tipo",
            description:"Oque",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction, args ) => {

        
        let nome = interaction.options.getString("nome")
        
        let tipo = interaction.options.getString("tipo")

        let tru = await db.get(`emp_${interaction.user.id}`)
        if (tru === true) {
           interaction.reply({ content: `${interaction.user}, Você já tem uma empresa registrada.`, ephemeral: true })
        } else {

        db.add(`empresan_${interaction.user.id}`, nome)
        
        db.add(`empresat_${interaction.user.id}`, tipo)
        db.add(`saldoemp_${interaction.user.id}`, 10000)
        db.add(`emp_${interaction.user.id}`, true)

        const embed = new Discord.EmbedBuilder()
        .setTitle(`${interaction.user.tag} | Criação de Empresa`)
        .setColor(`DarkGreen`)
        .setDescription(`### Informações:`)
        .addFields(
            { name:`Nome da Empresa`, value:`**${nome}**`},
            { name:`CEO da ${nome}`, value:`**${interaction.user.tag}**`},
            { name:`Tipo da Empresa`, value:`**${tipo}**`},
            { name:`Bônus`, value:`Você Recebeu 10 Mil Pizzas de bônus`}
        )

        interaction.reply({embeds: [embed]})
        }
    }
}