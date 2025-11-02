<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Console\Events\CommandStarting;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class TestGeneratorServiceProvider extends ServiceProvider
{
    protected $commandMappings = [
        'make:model' => ['suffix' => '', 'types' => ['feature', 'unit']],
        'make:controller' => ['suffix' => 'Controller', 'types' => ['feature']],
        'make:middleware' => ['suffix' => 'Middleware', 'types' => ['unit']],
        'make:job' => ['suffix' => 'Job', 'types' => ['unit']],
        'make:service' => ['suffix' => 'Service', 'types' => ['unit']],
        'make:request' => ['suffix' => 'Request', 'types' => ['unit']],
        'make:resource' => ['suffix' => 'Resource', 'types' => ['unit']],
    ];

    public function boot()
    {
        Event::listen(CommandStarting::class, function ($event) {
            $command = $event->command;
            if (isset($this->commandMappings[$command])) {
                $name = $this->getName($event);
                $this->generateTests($name, $this->commandMappings[$command]);
            }
        });
    }

    private function getName($event)
    {
        $args = $event->input->getArguments();
        $name = $args['name'] ?? '';
        
        foreach ($this->commandMappings as $mapping) {
            $suffix = $mapping['suffix'];
            if ($suffix && Str::endsWith($name, $suffix)) {
                $name = Str::beforeLast($name, $suffix);
                break;
            }
        }
        
        return $name;
    }

    private function generateTests($name, $config)
    {
        foreach ($config['types'] as $type) {
            $testName = "{$name}Test";
            $options = [];

            if ($type === 'unit') {
                $options['--unit'] = true;
            }

            Artisan::call('make:test', array_merge([
                'name' => $testName,
            ], $options));

            $testPath = $type === 'unit' 
                ? base_path("tests/Unit/{$testName}.php")
                : base_path("tests/Feature/{$testName}.php");

            if (file_exists($testPath)) {
                $this->addTestStubs($testPath, $name, $config['suffix']);
            }
        }
    }

    private function addTestStubs($path, $name, $suffix)
    {
        $content = file_get_contents($path);
        $className = $name . $suffix;
        $namespace = $this->getNamespace($className);
        
        $testMethods = $this->getTestStubs($name, $suffix);
        
        $content = preg_replace(
            '/}(\s*)$/',
            $testMethods . "\n}$1",
            $content
        );

        $useStatement = "\nuse {$namespace}\\{$className};";
        $content = str_replace(
            'use Tests\TestCase;',
            "use Tests\TestCase;{$useStatement}",
            $content
        );

        file_put_contents($path, $content);
    }

    private function getNamespace($className)
    {
        if (Str::endsWith($className, 'Controller')) {
            return 'App\Http\Controllers';
        } elseif (Str::endsWith($className, 'Middleware')) {
            return 'App\Http\Middleware';
        } elseif (Str::endsWith($className, 'Job')) {
            return 'App\Jobs';
        } elseif (Str::endsWith($className, 'Service')) {
            return 'App\Services';
        } elseif (Str::endsWith($className, 'Request')) {
            return 'App\Http\Requests';
        } elseif (Str::endsWith($className, 'Resource')) {
            return 'App\Http\Resources';
        }
        return 'App\Models';
    }

    private function getTestStubs($name, $suffix)
    {
        $methods = "\n    /**\n     * 基本的な機能テスト\n     */\n";
        
        if ($suffix === 'Controller') {
            return $methods . "    public function test_index_returns_success()\n    {\n        \$response = \$this->get('/" . Str::plural(strtolower($name)) . "');\n        \$response->assertStatus(200);\n    }";
        } elseif ($suffix === 'Middleware') {
            return $methods . "    public function test_middleware_handles_request()\n    {\n        \$middleware = new {$name}Middleware();\n        \$request = request();\n        \$response = \$middleware->handle(\$request, function () {});\n        \$this->assertNotNull(\$response);\n    }";
        } elseif ($suffix === '') {
            return $methods . "    public function test_can_create_" . strtolower($name) . "()\n    {\n        \$data = [\n            // TODO: モデルの属性を定義\n        ];\n        \${$name} = {$name}::create(\$data);\n        \$this->assertInstanceOf({$name}::class, \${$name});\n    }";
        }
        
        return $methods . "    public function test_" . strtolower($name) . "_basic_functionality()\n    {\n        \$this->assertTrue(true);\n        // TODO: テストケースを実装\n    }";
    }
}