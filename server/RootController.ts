import {Controller, Param, Body, Get, Post, Put, Delete} from "routing-controllers";

@Controller()
export class RootController {

    @Get("/")
    getAll() {
        return "This action returns the root";
    }

    // @Get("/roots/:id")
    // getOne(@Param("id") id: number) {
    //     return "This action returns root #" + id;
    // }
    //
    // @Post("/roots")
    // post(@Body() root: any) {
    //     return "Saving root...";
    // }
    //
    // @Put("/roots/:id")
    // put(@Param("id") id: number, @Body() root: any) {
    //     return "Updating a root...";
    // }
    //
    // @Delete("/roots/:id")
    // remove(@Param("id") id: number) {
    //     return "Removing root...";
    // }

}