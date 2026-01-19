<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace YoastSEO_Vendor\Symfony\Contracts\Service;

use YoastSEO_Vendor\Psr\Container\ContainerExceptionInterface;
use YoastSEO_Vendor\Psr\Container\NotFoundExceptionInterface;

trait ServiceLocatorTrait
{
    private $factories;
    private $services = [];
    private $loading = [];
    private $providedTypes = [];

    /**
     * @param array<string, callable> $factories A map of service IDs to factory callables
     */
    public function __construct(array $factories)
    {
        $this->factories = $factories;
    }

    /**
     * {@inheritdoc}
     */
    public function has(string $id): bool
    {
        return isset($this->factories[$id]);
    }

    /**
     * {@inheritdoc}
     */
    public function get(string $id)
    {
        if (!isset($this->factories[$id])) {
            throw $this->createNotFoundException($id);
        }

        if (isset($this->services[$id])) {
            return $this->services[$id];
        }

        if (isset($this->loading[$id])) {
            // Circular reference detected
            throw $this->createCircularReferenceException($id, array_keys($this->loading));
        }

        $this->loading[$id] = true;

        try {
            $this->services[$id] = ($this->factories[$id])();
        } finally {
            unset($this->loading[$id]);
        }

        return $this->services[$id];
    }

    /**
     * Returns an associative array of service types keyed by their IDs.
     *
     * @return array<string|int, string> e.g. ['logger' => 'Psr\Log\LoggerInterface', 'foo' => '?'] where ? = unspecified type or nullable
     */
    public function getProvidedServices(): array
    {
        if ($this->providedTypes) {
            return $this->providedTypes;
        }

        foreach ($this->factories as $name => $factory) {
            // attempt to infer type from factory return type; if unavailable, fallback to '?'
            $type = '?';

            if (is_array($factory) && $factory[0] instanceof \Closure && $factory[0]->getReturnType()) {
                $rt = $factory[0]->getReturnType();
                if ($rt instanceof \ReflectionNamedType) {
                    $type = ($rt->allowsNull() ? '?' : '').$rt->getName();
                } else {
                    $type = (string) $rt;
                }
            }

            $this->providedTypes[$name] = $type;
        }

        return $this->providedTypes;
    }

    private function createNotFoundException(string $id): NotFoundExceptionInterface
    {
        return new class(sprintf('Service "%s" not found in service locator.', $id)) extends \InvalidArgumentException implements NotFoundExceptionInterface {
        };
    }

    private function createCircularReferenceException(string $id, array $path): \LogicException
    {
        return new \LogicException(sprintf('Circular reference detected for service "%s", path: "%s".', $id, implode(' -> ', $path)));
    }
}
