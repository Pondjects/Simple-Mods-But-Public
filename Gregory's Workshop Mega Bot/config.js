const _config = {

  main_config: {
      token: "MTAzMDU5NzMxNzczNDE4MjkxMg.Gojxou.eRYipaQUmJOlTkkSCFGPD3r76dQXOoPVupJeJI", // Make sure you either leave everything else blank or set as false change everything you want in here
      prefix: "sm",
      server_id: "1036749450112155648",
      server_name: "Simple Mods",
      bot_name: "Simple Mods",
      footer: "Simple Mods | The Best Modding Place",
      color: "#264b99",
      server_logo: "https://cdn.discordapp.com/attachments/1037437909009174668/1037446340109676564/a_c02e93c7ac2e1446ca9770943d04a051.png",
      error_color: "#fc0303",
      error_messages: "embed", // embed or simple
      server_rules: "https://discord.com/channels/1036749450112155648/1036754321062240357"
    },

    status_config: {
      type1: `WATCHING`,
      name1: `For Tickets`,
      type2: `LISTENING`,
      name2: `To Music`,
      type3: `WATCHING`,
      name3: `South Vally RP`    },

    log_toggle: {
      deleted_message_logs: true,
      fun_commands_logs: true,
      general_logs: true,
      bug_report_logs: true,
      player_report_logs: true,
      intro_outro_logs: true,
      sayem_logs: true,
      warn_logs: true,
      commend_logs: true,
      say_logs: true,
      close_logs: true,
      dm_logs: true,
      clear_logs: true,
      kick_logs: true,
      ban_logs: true,
      new_ticket_logs: true,
      add_remove_user_logs: true,
      rename_ticket_logs: true,
      do_not_type_command_logs: true,
      suggestion_logs: true,
      welcome_logging: true,
      leave_logging: true
    },

    command_toggle: {
      miss_spelt_command_error_msg: true,
      fun_commands: true,
      rule_command: true,
      bug_report_command: true,
      player_report_command: true,
      ticket_panel: true,
      intro_outro: true,
      sayem_command: true,
      warn_command: true,
      commend_command: true,
      kick_command: true,
      ban_command: true,
      say_command: true,
      close_ticket: true,
      dm_command: true,
      clear_command: true,
      ticket_commands: true,
      do_not_type_command: true,
      welcome_enabled: true,
      leave_enabled: true,
      member_counter_VC: true
    },

    log_config: {
      log_embed_color: "#6075a3",
      log_embed_footer: "Crizzle test bot footer",
      deleted_message_logging_channel: "1007027259724542103",
      fun_commands_logs_channel: "1007027259724542103",
      general_logs_channel: "1007027259724542103",
      bug_report_logs_channel: "1007027259724542103",
      player_report_logs_channel: "1007027259724542103",
      intro_outro_logs_channel: "1007027259724542103",
      sayem_logs_channel: "1007027259724542103",
      warn_logs_channel: "1007027259724542103",
      commend_logs_channel: "1007027259724542103",
      kick_logs_channel: "1007027259724542103",
      ban_logs_channel: "1007027259724542103",
      say_logs_channel: "1007027259724542103",
      close_command_log_channel: "1007027259724542103",
      dm_logs_channel: "1007027259724542103",
      clear_logs_channel: "1007027259724542103",
      new_ticket_logs_channel: "1007027259724542103",
      add_remove_user_logs_channel: "1007027259724542103",
      rename_ticket_log_channel: "1007027259724542103",
      suggestion_channel: "1007027259724542103",
      welcome_logging_channel: "1007027259724542103",
      leave_logging_channel: "1007027259724542103",
      member_counter_vc_channel: "1007027395213152256"
    },

    command_perms: {
      ticket_panel_perms: ['1007027449072210091'],
      intro_outro_perms: ['1007027449072210091'],
      sayem_perms: ['1007027449072210091'],
      warn_perms: ['1007027449072210091'],
      commend_perms: ['1007027449072210091'],
      kick_perms: ['1007027449072210091'],
      ban_perms: ['1007027449072210091'],
      say_perms: ['1007027449072210091'],
      close_perms: ['1007027449072210091'],
      dm_perms: ['1007027449072210091'],
      clear_perms: ['1007027449072210091'],
      add_remove_user_perms: ['1007027449072210091'],
      rename_perms: ['1007027449072210091'],
      do_not_type_command_perms: ['1007027449072210091']
    },

    ticket_config: {
      open_ticket_channelID: "1007027545650245663",
      ticket_category: "1007027211594891285",
      open_ticket_message: "Hey! How can we help you today?",
      ticket_staff_ping: "1007027449072210091"
    },

    welcome_config: {
      welcome_notice: "Welcome to Gregory's Workshop!",
      welcome_role: "1007027449072210091",
      welcome_channel: "1007027259724542103"
    },

    leave_config: {
      leave_channel: "1007027259724542103"
    }
}

module.exports = _config