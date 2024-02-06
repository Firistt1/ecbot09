const Discord = require("discord.js")

const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name:"info-empresa",
    description:"Obtenha informações de um empresa",
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name:"usuário",
            description:"Mencione um usuário",
            type: Discord.ApplicationCommandOptionType.User,
            required: false
        }
    ],

    run: async(client, interaction, args ) => {
        let user = interaction.options.getUser("usuário") || interaction.user

        let empn = await db.get(`empresan_${user.id}`)
        let empt = await db.get(`empresat_${user.id}`)
        let emps = await db.get(`saldoemp_${user.id}`)
        let ve = await db.get(`vep_${user.id}`)
        if (ve === null) ve = ``;
        
        let tru = await db.get(`emp_${user.id}`)
        if(tru === null) tru = false;
        if (tru === false) {
            interaction.reply({ content: `<:guildCross:1204271384142807140> | ${user.tag}, Não tem uma empresa registrada.`, ephemeral: true })
        } else {
            if (user.id === interaction.user.id) {
                let embed = new Discord.EmbedBuilder()
                .setTitle(`Empresa de ${user.tag}`)
                .setColor(`Purple`)
                .addFields(
                    { name:`Nome da Empresa:`, value:`**${empn}${ve}**`},
                    { name:`Dono:`, value:`**${user.tag}**`},
                    { name:`Saldo`, value:`**${emps}**`}
                )

                const Butão = new Discord.ButtonBuilder()
                .setCustomId(`verifie`)
                .setLabel(`Selo Verificado`)
                .setEmoji(`<:ServerstatusVerifiedDefault:1204281848348282930>`)
                .setStyle(Discord.ButtonStyle.Secondary)

                /*const Butão2 = new Discord.ButtonBuilder()
                .setCustomId(`tese`)
                .setLabel(``)

                const row = new Discord.ActionRowBuilder()
                .addComponents(Butão);*/

                interaction.reply({embeds: [embed]/*, components: [row]*/})
            } else {
                let embed = new Discord.EmbedBuilder()
                .setTitle(`Empresa de ${user.tag}`)
                .setColor(`Purple`)
                .addFields(
                    { name:`Nome da Empresa:`, value:`**${empn}${ve}**`},
                    { name:`Dono:`, value:`**${user.tag}**`},
                    { name:`Saldo`, value:`**${emps}**`}
                )
                interaction.reply({embeds: [embed]})
            }
        }

        


    }
}