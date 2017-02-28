/*
 * Copyright (C) 2017 Sankarsan Kampa
 *                    https://sankarsankampa.com/contact
 *
 * This file is a part of Bastion Discord BOT.
 *                        https://github.com/snkrsnkampa/Bastion
 *
 * This code is licensed under the SNKRSN Shared License. It is free to
 * download, copy, compile, use, study and refer under the terms of the
 * SNKRSN Shared License. You can modify the code only for personal or
 * internal use only. However, you can not redistribute the code without
 * explicitly getting permission fot it.
 *
 * Bastion BOT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY. See the SNKRSN Shared License for
 * more details.
 *
 * You should have received a copy of the SNKRSN Shared License along
 * with this program. If not, see <https://github.com/snkrsnkampa/Bastion/LICENSE>.
 */

const sql = require('sqlite');
sql.open('./data/Bastion.sqlite');

module.exports = (guild, user) => {
  sql.get(`SELECT log, logChannelID FROM guildSettings WHERE guildID ='${guild.id}'`).then(row => {
    if (row.log == 'false') return;
    guild.channels.get(row.logChannelID).sendMessage('', {embed: {
      color: 14845440,
      title: 'User Unbanned',
      fields: [
        {
          name: 'Username',
          value: `**${user.username}**#${user.discriminator}`,
          inline: true
        },
        {
          name: 'ID',
          value: user.id,
          inline: true
        },
        {
          name: 'Unbanned At',
          value: new Date().toUTCString(),
          inline: false
        }
      ]
    }});
  });
};