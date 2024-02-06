const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const dono = "1015623217093820426"


module.exports = {
    name:"add-iten",
    description:"������ -  add",
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name:"variável",
            description:"qual a variável",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name:"usuário",
            description:"Qual usuário vai receber este benefício?",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name:"item",
            description:"emoji/item",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction, args) => {

        const user = interaction.options.getUser("usuário")
        const vari = interaction.options.getString("variável")
        const emoji = interaction.options.getString("item")
        if(interaction.user.id !== dono) return interaction.reply({content:`<:guildCross:1204271384142807140> | Apenas meu **Desenvolvedor** pode usar isso`, ephemeral: true})



        

        db.set(`${vari}_${user.id}`, `${emoji}`)

        interaction.reply({content:`<:Duration24Months:1203817116050915398> - O Premium de ${user} foi adicionado com sucesso`, ephemeral: true})
        
    }
}