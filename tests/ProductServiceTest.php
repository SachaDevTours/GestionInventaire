<?php
require_once __DIR__ . '/../vendor/autoload.php';
use PHPUnit\Framework\TestCase;
use Services\ProductService;
use Repositories\ProductRepository;
use Entities\Product;

class ProductServiceTest extends TestCase {
    private $productRepoMock;
    private $productService;

    protected function setUp(): void {
        $this->productRepoMock = $this->createMock(ProductRepository::class);
        $this->productService = new ProductService($this->productRepoMock);
    }

    public function testGenerateQRCodeData(): void {
        $productId = 1;
        $expectedQrData = "/product/1";
        $this->assertEquals($expectedQrData, $this->productService->generateQRCodeData($productId));
    }

    public function testAddProduct(): void {
        $product = new Product("Test Product", 10, 20.5, "", 0);
        
        $this->productRepoMock->expects($this->once())
            ->method('addProduct')
            ->willReturn(true);
        
        $this->assertTrue($this->productService->addProduct($product));
    }

    public function testGetAllProducts(): void {
        $expectedProducts = [
            ["id" => 1, "nom" => "Product A", "quantite" => 5, "prix" => 15, "qr_code" => "/product/1"],
            ["id" => 2, "nom" => "Product B", "quantite" => 8, "prix" => 9, "qr_code" => "/product/2"]
        ];

        $this->productRepoMock->method('getAllProducts')->willReturn($expectedProducts);
        
        $this->assertEquals($expectedProducts, $this->productService->getAllProducts());
    }
}
