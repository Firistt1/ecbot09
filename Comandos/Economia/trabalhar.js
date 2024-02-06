const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()
const ms = require("ms")
const cooldowns = {}

module.exports = {
    name:"work",
    description:"Trabalhe para receber um salário",
    type: Discord.ApplicationCommandType.ChatInput,


    run: async (client, interaction, args) => {

        if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("1 minute") // Coloque em ms o tempo
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        let embed = new Discord.EmbedBuilder()
        .setTitle("<:guildDate:1203889984755601448> | Ops")
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`### <:guildDate:1203889984755601448> | Espere \`${time}\` para trabalhar  novamente!`)

        interaction.reply({ embeds: [embed], ephemeral:true });return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};

        let quantia = Math.ceil(Math.random()* 1630);
        if (quantia < 900) quantia = quantia + 900;

        await db.add(`carteira_${interaction.user.id}`, quantia)

        let embed = new Discord.EmbedBuilder()
        .setTitle(`:money_with_wings: | Salário`)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true}))
        .setDescription(` Você trabalhou duro e recebeu ${quantia} como seu salário`)

        interaction.reply({embeds: [embed]})



    }
}