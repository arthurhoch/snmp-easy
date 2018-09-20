var nameOids = [
    {
        type: "Load",
        oids: [
            { name: "1 minute Load", oid: "1.3.6.1.4.1.2021.10.1.3.1", },
            { name: "5 minute Load", oid: "1.3.6.1.4.1.2021.10.1.3.2", },
            { name: "15 minute Load", oid: "1.3.6.1.4.1.2021.10.1.3.3", },
        ]
    },
    {
        type: "CPU",
        oids: [
            { name: "Percentage of user CPU time", oid: "1.3.6.1.4.1.2021.11.9.0", },
            { name: "Raw user cpu time", oid: "1.3.6.1.4.1.2021.11.50.0" },
            { name: "Percentages of system CPU time", oid: "1.3.6.1.4.1.2021.11.10.0" },
            { name: "Raw system cpu time", oid: "1.3.6.1.4.1.2021.11.52.0" },
            { name: "Percentages of idle CPU time", oid: "1.3.6.1.4.1.2021.11.11.0" },
            { name: "Raw idle cpu time", oid: "1.3.6.1.4.1.2021.11.53.0" },
            { name: "Raw nice cpu time", oid: "1.3.6.1.4.1.2021.11.51.0" },
        ]
    },
    {
        type: "Memory Statistics",
        oids: [
            { name: "Available Swap Space", oid: "1.3.6.1.4.1.2021.4.4.0" },
            { name: "Total RAM inmachine", oid: "1.3.6.1.4.1.2021.4.5.0" },
            { name: "Total RAM used", oid: "1.3.6.1.4.1.2021.4.6.0" },
            { name: "Total RAM Free", oid: "1.3.6.1.4.1.2021.4.11.0" },
            { name: "Total RAM Shared", oid: "1.3.6.1.4.1.2021.4.13.0" },
            { name: "Total RAM Buffered", oid: "1.3.6.1.4.1.2021.4.14.0" },
            { name: "Total Cached Memory", oid: "1.3.6.1.4.1.2021.4.15.0" },
        ]
    },
    {
        type: "Disk Statistics",
        oids: [
            { name: "Path where the disk is mounted", oid: "1.3.6.1.4.1.2021.9.1.2.1" },
            { name: "Path of the device for the partition", oid: "1.3.6.1.4.1.2021.9.1.3.1" },
            { name: "Total size of the disk (kBytes):", oid: "1.3.6.1.4.1.2021.9.1.6.1" },
            { name: "Available space on the disk", oid: "1.3.6.1.4.1.2021.9.1.7.1" },
            { name: "Used space on the disk", oid: "1.3.6.1.4.1.2021.9.1.8.1" },
            { name: "Percentage of space used on disk", oid: "1.3.6.1.4.1.2021.9.1.9.1" },
            { name: "Percentage of inodes of disk", oid: "1.3.6.1.4.1.2021.9.1.10.1" }
        ]
    }
];

module.exports = { nameOids, };