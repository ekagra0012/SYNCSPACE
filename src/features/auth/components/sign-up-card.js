"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpCard = void 0;
var zod_1 = require("zod");
var link_1 = require("next/link");
var fc_1 = require("react-icons/fc");
var fa_1 = require("react-icons/fa");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("@hookform/resolvers/zod");
var dotted_seperator_1 = require("@/components/dotted-seperator");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var form_1 = require("@/components/ui/form");
var formSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Required"),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, "Minimum of 8 characters required"),
});
var SignUpCard = function () {
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    var onSubmit = function (values) {
        console.log(values);
    };
    return (<card_1.Card className="w-full h-full md:2-[487px] border-none shadow-none">
            <card_1.CardHeader className="flex items-centre justify-center text-center p-7">
                <card_1.CardTitle className="text-2xl">
                    Sign Up
                </card_1.CardTitle>
                <card_1.CardDescription>
                    By signing up, you agree to our {" "}
                    <link_1.default href="/privacy">
                     <span className="text-blue-700">Privacy Policy</span>
                    </link_1.default>{" "}
                    and {" "}
                    <link_1.default href="/terms">
                     <span className="text-blue-700">Terms of Service</span>
                    </link_1.default>
                </card_1.CardDescription>
            </card_1.CardHeader>
            <div className="px-7 mb-2">
                <dotted_seperator_1.DottedSeperator />
            </div>
            <card_1.CardContent className="p-7">
                <form_1.Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <form_1.FormField name="name" control={form.control} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem>
                                    <form_1.FormControl>
                                        <input_1.Input {...field} type="text" placeholder="Enter your name"/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                </form_1.FormItem>);
        }}/>
                            <form_1.FormField name="email" control={form.control} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem>
                                        <form_1.FormControl>
                                            <input_1.Input {...field} type="email" placeholder="Enter email address"/>
                                        </form_1.FormControl>
                                        <form_1.FormMessage />
                                    </form_1.FormItem>);
        }}/>

    <form_1.FormField name="password" control={form.control} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem>
                                    <form_1.FormControl>
                                        <input_1.Input {...field} type="password" placeholder="Enter your password"/>
                                    </form_1.FormControl>
                                    <form_1.FormMessage />
                                </form_1.FormItem>);
        }}/>
                            <button_1.Button disabled={false} size="lg" className="w-full">
                                Login
                            </button_1.Button>
                        </form>
                    </form_1.Form>
            </card_1.CardContent>
            <div className="px-7">
                <dotted_seperator_1.DottedSeperator />
            </div>
            <card_1.CardContent className="p-7 flex flex-col gap-y-4">
                <button_1.Button disabled={false} variant="secondary" size="lg" className="w-full">
                    <fc_1.FcGoogle className="mr-2 size-5"/>
                    Login with Google
                </button_1.Button>
                <button_1.Button disabled={false} variant="secondary" size="lg" className="w-full">
                    <fa_1.FaGithub className="mr-2 size-5"/>
                    Login with Github
                </button_1.Button>
            </card_1.CardContent>
        </card_1.Card>);
};
exports.SignUpCard = SignUpCard;
