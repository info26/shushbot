#shh-bot.py

import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

#load_dotenv()
#TOKEN = os.getenv('DISCORD_TOKEN')

TOKEN = <insert token here>

client = commands.Bot(command_prefix="/")
APPLIED_CHANNELS = []

whospracticing = {}

@client.event
async def onready():
    print(
        f'Logged in as {client.user}!'
    )
    
@client.command(name="practice", help="good, now only 40 hours to go and immediate restart right after")
async def practice(ctx):
    if ctx.author.voice is None:
        client.send(f"{ctx.message.author},(X) You aren't in a voice channel")
    else:
        #user is in a voice channel
        practicing = whospracticing[ctx.member.voice.channel.id]
        if practicing == ctx.message.author.id:
            ctx.send("(X) You are already practicing"
        elif practicing != "upforgrabds" or ctx.member.voice.channel.id not in whospracticing:
            ctx.send("(X) The channel already has someone practicing")
        elif practicing =="upforgrabs":
            ctx.send("Ok, you are now practicing")
            ctx.member.voice.setMute(false, "user is now practicing.")
            whospracticing[ctx.member.voice.channel.id] = ctx.message.author.id
            

@client.command(name="nomore", help="only available after 40 hours of practicing")
async def nomore(ctx):
    if ctx.message.author.id == whospracticing[ctx.member.voice.channel.id]:
        ctx.send("Ok, you're no longer practicing.")
        ctx.member.voice.setMute(true, "user is no longer practicing")
        whospracticing[ctx.member.voice.channel.id]="upforgrabs"
        ctx.send("The user who was practicing has left of does not want to practice anymore :(. The first person to say '/practice' will able to practice.")
    else:
        ctx.send("(X) You're not the one practicing!")

@client.command(name="np", help="shows who is doing the right thing")
async def np(ctx):
    for key, value in whospracticing.items():
        response = client.get_user(value) #i think the values of the dictionary are the userids
    ctx.send(response)

@client.event
async def on_voice_state_update(member, before, after):
    if before.voice.channel is None and after.voice.channel is not None: #test case for if user joined channel
        print("new user joined")
        print(member.id)
        if member.channel.id not in APPLIED_CHANNELS:
            member.voice.setMute(false, "unmute because member is in a channel which the bot doesn't manage.")
        else:
            if after.channel.members.size == 1 & after.channel.id in APPLIED_CHANNELS:
                if whospracticing[after.channel.id] == "upforgrabs":
                    member.voice.setMute(false, "unmute because channel is up for grabs. (no one is practicing)")
                else:
                    member.voice.setMute(false, "unmute because they are only user in channel")
                    whospracticing[after.channel.id] = member.id
            else:
                member.voice.setMute(true, "mute because they are listening")
            
           
    elif before.voice.channel is not None and after.voice.channel is not None: #user has switched channels or unrelated update
        if after.voice.channel.id != before.channel.id:
            if whospracticing[before.voice.channel.id] and before.member.id == whospracticing[before.channel.id]:
                whospracticing[oldmember.channel.id] = "upforgrabs"
                msgchannel = member.guild.channels.cache.find(lambda ch: ch.id == '691739049039495239') #i have no clue if this is right whatsoever
                if after.channel.members.size > 0:
                    msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '/practice' will be able to practice. Room Name: " + before.channel.name)
            print("new user joined")
            print(after.channel.id)
            if after.channel.id not in APPLIED_CHANNELS:
                member.voice.setMute(false, "unmute because they are in a channel the bot does not manage")
            else:
                if after.channel.members.size == 1 and after.channel.id in APPLIED_CHANNELS:
                    if whospracticing[after.channel.id] == "upforgrabs":
                        member.voice.setMute(false, "unmute because the channel is up for grabs. (No one is practicing)")
                    else:
                        member.voice.setMute(false, "unmute because the channel is up for grabs. (No one is practicing)")
                        whospracticing[after.channel.id] = member.id
                else:
                    after.member.voice.setMute(true, "auto mute")
        else:
            print('i hate my life. im pretty sure most of this doesnt even work. unnecessary update avoided.')            
    elif before.voice.voice_channel is not None and after.voice.voice_channel is None: #user has left
        if member.id == whospracticing[after.channel.id]:
            whospracticing[after.channel.id] = "upforgrabs"
            msgchannel = member.guild.channels.cache.find(lambda ch : ch.id == '691739049039495239') #i have no clue if this is right whatsoever
            if before.channel.members.size > 0:
                msgchannel.send("The user who was practicing has left or does not want to practice anymore. The first person to say '/practice' will be able to practice. Room Name: " + before.channel.name)
            
       

client.run(TOKEN)       