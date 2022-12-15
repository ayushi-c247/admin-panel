import {
    Controller,
    UseGuards,
    Get,
    Post,
    Body,
    Delete,
    Put,
    Request,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { multerOptions } from '../../../../libs/common/src/config/multer.config';
  
  import {
    CreateUserDto,
    ChangePasswordDto,
    UpdateUserDto,
    ForgetPasswordDto,
    ResetPasswordDto,
  } from './dto/users.dto';
  import { UserService } from './users.services';
  
  @Controller('/auth/users')
  export class UserController {
    constructor(private userService: UserService ) {}
  
    //Signup-User
    @Post('/signup')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    registration(@Body() createUserDto: CreateUserDto, @UploadedFile() file) {
      return this.userService.registration(createUserDto, file);
    }
  
    @Get()
    getHH(@Request() req) {
      return this.userService.gethh();
    }
    //User-Profile
    @UseGuards(AuthGuard('jwt'))
    @Get('/user-profile')
    getUserProfile(@Request() req) {
      return this.userService.getUserProfile(req);
    }
  
    //Delete-User
    @UseGuards(AuthGuard('jwt'))
    @Delete()
    deleteUser(@Request() req) {
      return this.userService.deleteUser(req);
    }
  
    //Update-Profile
    @UseGuards(AuthGuard('jwt'))
    @Put('/')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    updateProfile(
      @Body() updateUserDto: UpdateUserDto,
      @Request() req,
      @UploadedFile() file,
    ) {
      return this.userService.updateProfile(updateUserDto, req, file);
    }
  
    //Change-Password
    @UseGuards(AuthGuard('jwt'))
    @Put('/change-password')
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
      return this.userService.changePassword(changePasswordDto, req);
    }
  
    //Forget-Password
    @Post('/forget-password')
    forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
      return this.userService.forgetPassword(forgetPasswordDto);
    }
  
    //Reset-Password
    @Post('/reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      return this.userService.resetPassword(resetPasswordDto);
    }
  
    //Verify
    @Post('/verify')
    verifyLink(@Body() forgetPasswordDto: ForgetPasswordDto) {
      return this.userService.verifyLink(forgetPasswordDto);
    }
  }
  