<?php

namespace BSR\Brumann\Polyfill;

final class Unserialize
{
    /**
     * @see https://secure.php.net/manual/en/function.unserialize.php
     *
     * @param string $serialized Serialized data
     * @param array $options Associative array containing options
     *
     * @return mixed
     */
    public static function unserialize($serialized, array $options = array())
    {
        if (PHP_VERSION_ID >= 70000) {
            return \unserialize($serialized, $options);
        }
        if (!array_key_exists('allowed_classes', $options) || true === $options['allowed_classes']) {
            return \unserialize($serialized);
        }
        $***REMOVED*** = $options['allowed_classes'];
        if (false === $***REMOVED***) {
            $***REMOVED*** = array();
        }
        if (!is_array($***REMOVED***)) {
            $***REMOVED*** = array();
            trigger_error(
                'unserialize(): allowed_classes option should be array or boolean',
                E_USER_WARNING
            );
        }

        $worker = new DisallowedClassesSubstitutor($serialized, $***REMOVED***);

        return \unserialize($worker->getSubstitutedSerialized());
    }
}
