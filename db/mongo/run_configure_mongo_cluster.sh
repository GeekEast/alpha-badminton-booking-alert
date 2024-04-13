#!/bin/bash

sleep 10

#  to add a secondary instance
mongo <<< "
rs.initiate();
rs.add('phapi-li-mongo-secondary:27017');
"

#  to delay the secondary instance synchronization for 1 second
mongo <<< "
cfg = rs.conf();
cfg.members[1].priority = 0;
cfg.members[1].hidden = true;
cfg.members[1].slaveDelay = 1;
rs.reconfig(cfg);
"

# wait for 5 seconds
sleep 5s