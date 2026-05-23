import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

const warehouse=
await prisma.warehouse.create({

data:{
name:"Warehouse A"
}

})

const product=
await prisma.product.create({

data:{
name:"iPhone 16"
}

})

await prisma.inventory.create({

data:{

productId:
product.id,

warehouseId:
warehouse.id,

total:10,

reserved:0

}

})

}

main()
.then(()=>{

console.log("Seed complete")

})

.catch(console.error)
.finally(

async()=>{

await prisma.$disconnect()

}

)