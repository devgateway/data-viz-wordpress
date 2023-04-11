<?php

namespace SPTP;

require SPTP_PATH . '/includes/***REMOVED***.php';

$loader = new ***REMOVED***;
$loader->register();
$loader->addNamespace( 'SPTP', SPTP_PATH . '/includes' );

new Bootstrap();
