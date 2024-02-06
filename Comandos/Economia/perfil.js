const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name:"perfil",
    description:"Veja seu perfil",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false 
        }
    ],

    run: async (cliente, interaction, args) => {

        const user = interaction.options.getUser("usuário") || interaction.user
        let carteira = await db.get(`carteira_${user.id}`)
        if (carteira === null) carteira = 0;

        let sobremim = await db.get(`sobremim_${user.id}`)
        if (sobremim === null) sobremim = `Amo Pizza`;

        let bgp = await db.get(`premium_${user.id}`)
        if (bgp === null) bgp = ``;
        let bgd = await db.get(`bgdev_${user.id}`)
        if (bgd === null) bgd = ``;

        if (user.id === interaction.user.id) {
            const emebd1 = new Discord.EmbedBuilder()
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setDescription(`### Perfil de ${user.tag}\n* Sobremim ${sobremim}\n* Total de Pizzas: ${carteira}\n* Badges: ${bgp} ${bgd}`)

                

            interaction.reply({ embeds: [emebd1] })

        } else {
            const emebd1 = new Discord.EmbedBuilder()
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setDescription(`### Perfil de ${user}\n* Sobremim ${sobremim}\n* Total de Pizzas: ${carteira}\n* Badges: ${bgp} ${bgd}`)

            interaction.reply({ embeds: [emebd1] })


        }
    }  

    
}