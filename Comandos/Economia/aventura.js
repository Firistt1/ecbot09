const Diacord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
const cooldowns = {}

module.exports = {
    name:"aventura",
    description: "Saia em Uma aventura em busca de tesouro",
    type: Diacord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args ) => {

        if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("3 minute") // Coloque em ms o tempo
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        const embed = new Diacord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Ops")
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`### <:guildDate:1203889984755601448>  | Espere \`${time}\` para sair em uma nova aventura!`)

        interaction.reply({ embeds: [embed], ephemeral:true });return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};

        let quantia = Math.ceil(Math.random()* 3000);
        if (quantia < 300) quantia = quantia + 300;

        await db.add(`carteira_${interaction.user.id}`, quantia)

    let embed = new Diacord.EmbedBuilder()
    .setTitle(`Aventura`)
    .setDescription(`### Conclusão:\n * <:discovery:1203898639467024405> - No meio da sua aventura você encontra um baú e nele tinha **${quantia}** Pizzas`)

interaction.reply({embeds: [embed]})

    
    }
}