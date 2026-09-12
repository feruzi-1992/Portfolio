<?php
// Redirect root /Portfolio/ to the production build
header('Location: /Portfolio/dist/', true, 302);
exit;
