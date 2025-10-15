import React from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";


const Account = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <section>
        <div className="mx-auto max-w-[1400px]">
          <h1 className="text-2xl font-medium">Account</h1>
          
          <div>
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-black/30 p-5">
              <div className="flex items-center gap-7">
                <img
                  className="h-28 w-28 rounded-full"
                  src="/limon.jpg"
                  alt="admin image"
                />
                <div>
                  <h4 className="text-2xl font-semibold text-black">
                    Mahammud Hassan Limon
                  </h4>
                  <div className="flex gap-3">
                    <h5 className="text-sm font-normal text-black/50">Admin</h5>
                    <div className="border-r border-black/50"></div>
                    <h5 className="text-sm font-normal text-black/50">
                      Dhaka, Bangladesh
                    </h5>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-[30px]">
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-facebook-f"></i>
                  </span>
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-x-twitter"></i>
                  </span>
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-instagram"></i>
                  </span>
                  <span className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-500 text-[24px] text-red-500 duration-300 ease-in-out hover:bg-red-400 hover:text-white">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </span>
                </div>
                <div>
                  <Button color="red" onClick={handleOpen} variant="gradient">
                    <i class="fa-light fa-pen-line mr-2"></i>
                    <span>Edit</span>
                  </Button>
                  <Dialog
                    size="sm"
                    open={open}
                    handler={handleOpen}
                    className="h-[690px] w-full overflow-y-scroll p-4"
                  >
                    <DialogHeader className="relative m-0 block">
                      <Typography variant="h4" color="blue-gray">
                        Edit Profile
                      </Typography>
                      <Typography className="mt-1 font-normal text-gray-600">
                        Keep your records up-to-date and organized.
                      </Typography>
                      <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleOpen}
                      >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                      </IconButton>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Name
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="eg. White Shoes"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <Typography variant="h5" color="blue-gray">
                        Social Media Link
                      </Typography>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Facebook
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Instagram
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Linkedin
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="h4"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          <i class="fa-brands fa-square-x-twitter"></i>
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <Typography variant="h5" color="blue-gray">
                        Personal Infomation
                      </Typography>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          E-mail Address
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Home Address
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Phone
                        </Typography>
                        <Input
                          color="gray"
                          size="lg"
                          placeholder="Link"
                          name="name"
                          className="placeholder:opacity-100 focus:!border-t-gray-900"
                          containerProps={{
                            className: "!min-w-full",
                          }}
                          labelProps={{
                            className: "hidden",
                          }}
                        />
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 text-left font-medium"
                        >
                          Your Role
                        </Typography>
                        <Select
                          className="focus:!border-primary group-hover:!border-primary !w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-t-blue-gray-900"
                          placeholder="1"
                          labelProps={{
                            className: "hidden",
                          }}
                        >
                          <Option>Admin</Option>
                          <Option>Sub Admin</Option>
                          <Option>Seller</Option>
                        </Select>
                      </div>
                    </DialogBody>
                    <DialogFooter>
                      <Button className="ml-auto" onClick={handleOpen}>
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>
            </div>
            <div className="bord mt-8 flex items-center gap-[200px] rounded-2xl border border-black/30 p-5">
              <div>
                <h4 className="mb-4 text-2xl font-medium">
                  Personal Information
                </h4>
                <div className="grid grid-rows-4 gap-4">
                  <h4 className="text-sm font-normal">
                    name <span className="mr-3">:</span>
                    <span>Mahammud Hassan Limon</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Email <span className="mr-3">:</span>
                    <span>mahammudhassanlimon@gmail.com</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Phone <span className="mr-3">:</span>
                    <span>01887604100</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Bio <span className="mr-3">:</span>
                    <span>Admin</span>
                  </h4>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-2xl font-medium">Address</h4>
                <div className="grid grid-rows-4 gap-4">
                  <h4 className="text-sm font-normal">
                    Country <span className="mr-3">:</span>
                    <span>Bangladesh</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    City/State <span className="mr-3">:</span>
                    <span>Dhaka</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    Postal Code <span className="mr-3">:</span>
                    <span>1200</span>
                  </h4>
                  <h4 className="text-sm font-normal">
                    TAX ID <span className="mr-3">:</span>
                    <span>AS4568384</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Account;
