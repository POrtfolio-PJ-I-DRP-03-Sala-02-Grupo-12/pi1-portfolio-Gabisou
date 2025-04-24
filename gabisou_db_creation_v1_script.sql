-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gabisou_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gabisou_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gabisou_db` DEFAULT CHARACTER SET utf8 ;
USE `gabisou_db` ;

-- -----------------------------------------------------
-- Table `gabisou_db`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gabisou_db`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `link_name` VARCHAR(100) NULL,
  `link_url` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gabisou_db`.`people`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gabisou_db`.`people` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(75) NOT NULL,
  `user_name` VARCHAR(20) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gabisou_db`.`game_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gabisou_db`.`game_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NULL,
  `description` VARCHAR(70) NULL,
  `url` VARCHAR(45) NOT NULL,
  `game_id` INT NOT NULL,
  PRIMARY KEY (`id`, `game_id`),
  INDEX `fk_project_images_projects_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_project_images_projects`
    FOREIGN KEY (`game_id`)
    REFERENCES `gabisou_db`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
