/** @param {NS} ns **/
var myServers = [
    "home",
    "brood1",
    "brood2",
    "brood3",
    "brood4",
    "brood5"

];

// change the ^above^ to your servers


export async function main(ns) {
/*
    remote-hack.script for Bitburner v0.47.2
    Winners don't use copyright
(credit to the original creator tho, i only converted this to ns2)
    
    Latest version of this script should be at
        https://github.com/iuriguilherme/netscripts.d
    Bitburner should be at https://github.com/danielyxie/bitburner
    
    This script requires 2.55 GB of RAM to run for 1 thns.read(s)

    This script will automatically hack the current server, unless it 
    is the home server or it is at the mySerers list.
    It is supposed to be copied over to the server which is to be 
    hacked. It won't work on a server that has 2GB of RAM or less.
*/

// Add the servers you want to avoid being hacked here.
// WARNING: You were warned.

// Set the percentage of the await ns.grow() command via the first argument
var percentage = 25;
if (ns.args.length > 0) {
    if (ns.args[0] <= 100) {
        percentage = ns.args[0];
    }
}

const server = ns.getHostname();

// Pass another server's name or address as the second argument to hack 
// that one instead of the current server. This is useful for your own 
// servers.
if (ns.args.length > 1) {
    if (ns.serverExists(ns.args[1])) {
        server = ns.args[1];
    }
}

while (!myServers.includes(server)) {
    await weakenAll(server);
    await growAll(server, percentage);
    await ns.hack(server);
}

async function weakenAll(server) {
    while (
        ns.getServerSecurityLevel(server) >
        ns.getServerMinSecurityLevel(server)
    ) {
        while (!await ns.weaken(server));
    }
}

async function growAll(server, percentage) {
    // percentage value, can't be higher than 100
    if (percentage > 100) percentage = 100;
    while (
        ns.getServerMoneyAvailable(server) <
        (
            (percentage / 100) *
            ns.getServerMaxMoney(server)
        )
    ) {
        while (!await ns.grow(server));
    }
}
}
