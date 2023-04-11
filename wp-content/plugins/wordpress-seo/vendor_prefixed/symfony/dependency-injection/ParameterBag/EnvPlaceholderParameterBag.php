<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace YoastSEO_Vendor\Symfony\Component\***REMOVED***\ParameterBag;

use YoastSEO_Vendor\Symfony\Component\***REMOVED***\Exception\InvalidArgumentException;
use YoastSEO_Vendor\Symfony\Component\***REMOVED***\Exception\***REMOVED***;
/**
 * @author Nicolas Grekas <p@tchwork.com>
 */
class EnvPlaceholderParameterBag extends \YoastSEO_Vendor\Symfony\Component\***REMOVED***\ParameterBag\ParameterBag
{
    private $***REMOVED*** = [];
    private $providedTypes = [];
    /**
     * {@inheritdoc}
     */
    public function get($name)
    {
        if (0 === \strpos($name, 'env(') && ')' === \substr($name, -1) && 'env()' !== $name) {
            $env = \substr($name, 4, -1);
            if (isset($this->***REMOVED***[$env])) {
                foreach ($this->***REMOVED***[$env] as $placeholder) {
                    return $placeholder;
                    // return first result
                }
            }
            if (!\preg_match('/^(?:\\w++:)*+\\w++$/', $env)) {
                throw new \YoastSEO_Vendor\Symfony\Component\***REMOVED***\Exception\InvalidArgumentException(\sprintf('Invalid "%s" name: only "word" characters are allowed.', $name));
            }
            if ($this->has($name)) {
                $defaultValue = parent::get($name);
                if (null !== $defaultValue && !\is_scalar($defaultValue)) {
                    throw new \YoastSEO_Vendor\Symfony\Component\***REMOVED***\Exception\***REMOVED***(\sprintf('The default value of an env() parameter must be scalar or null, but "%s" given to "%s".', \gettype($defaultValue), $name));
                }
            }
            $uniqueName = \md5($name . \uniqid(\mt_rand(), \true));
            $placeholder = \sprintf('env_%s_%s', \str_replace(':', '_', $env), $uniqueName);
            $this->***REMOVED***[$env][$placeholder] = $placeholder;
            return $placeholder;
        }
        return parent::get($name);
    }
    /**
     * Returns the map of env vars used in the resolved parameter values to their placeholders.
     *
     * @return string[][] A map of env var names to their placeholders
     */
    public function ***REMOVED***()
    {
        return $this->***REMOVED***;
    }
    /**
     * Merges the env placeholders of another EnvPlaceholderParameterBag.
     */
    public function ***REMOVED***(self $bag)
    {
        if ($***REMOVED*** = $bag->***REMOVED***()) {
            $this->***REMOVED*** += $***REMOVED***;
            foreach ($***REMOVED*** as $env => $placeholders) {
                $this->***REMOVED***[$env] += $placeholders;
            }
        }
    }
    /**
     * Maps env prefixes to their corresponding PHP types.
     */
    public function ***REMOVED***(array $providedTypes)
    {
        $this->providedTypes = $providedTypes;
    }
    /**
     * Gets the PHP types corresponding to env() parameter prefixes.
     *
     * @return string[][]
     */
    public function ***REMOVED***()
    {
        return $this->providedTypes;
    }
    /**
     * {@inheritdoc}
     */
    public function resolve()
    {
        if ($this->resolved) {
            return;
        }
        parent::resolve();
        foreach ($this->***REMOVED*** as $env => $placeholders) {
            if (!$this->has($name = "env({$env})")) {
                continue;
            }
            if (\is_numeric($default = $this->parameters[$name])) {
                $this->parameters[$name] = (string) $default;
            } elseif (null !== $default && !\is_scalar($default)) {
                throw new \YoastSEO_Vendor\Symfony\Component\***REMOVED***\Exception\***REMOVED***(\sprintf('The default value of env parameter "%s" must be scalar or null, "%s" given.', $env, \gettype($default)));
            }
        }
    }
}
