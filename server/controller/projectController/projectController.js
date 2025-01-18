const project = require("../../models/project");
const user = require("../../models/user.model");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/TryCatch");

const createProject = catchAsync(
    async (req, res, next) => {
        const { title, isFeatured, productImage, price, shortDescription, productUrl, description, category, tags, createdBy, deletedAT } = req.body;

        const newProject = await project.create(
            {
                title,
                productImage,
                price,
                shortDescription,
                productUrl,
                description,
                category,
                tags,
                createdBy: req.user.id,
            });

        if (!newProject) {
            throw new AppError('Project not created', 400)
        }

        return res.status(200).json({
            status: "success",
            message: "Project created successfully",
            data: newProject,
        })

    });

const getAllProject = catchAsync(
    async (req, res, next) => {

        const allproject = await project.findAll({ include: user });

        if (!allproject) {
            throw new AppError('No project found', 400)
        }

        return res.status(201).json({
            status: "success",
            message: "All projects",
            data: allproject
        })

    });

const getProjectById = catchAsync(
    async (req, res, next) => {

        const projectId = req.params.id;
        const allproject = await project.findByPk(projectId, { include: user });

        if (!allproject) {
            throw new AppError('No project found', 400)
        }

        return res.status(200).json({
            status: "success",
            message: "All projects",
            data: allproject
        })

    });

const getProjectByUserId = catchAsync(
    async (req, res, next) => {

        const projectId = req.params.id;
        const allproject = await project.findAll({ where: { createdBy: req.user.id } });

        if (!allproject) {
            throw new AppError('No project found', 400)
        }

        return res.status(200).json({
            status: "success",
            message: "All projects",
            data: allproject
        })

    });

const updateProject = catchAsync(
    async (req, res, next) => {
        const userid = req.user.id;

        const { title, isFeatured, productImage, price, shortDescription, productUrl, description, category, tags, createdBy, deletedAT, id } = req.body;

        let projectDetails = await project.findOne({ where: { id: +id, createdBy: userid } });

        if (!projectDetails) {
            throw new AppError(`No project found with this id ${id} for user ${req.user.firstName}`, 400)
        }

        projectDetails.title = title,
            projectDetails.isFeatured = isFeatured || false,
            projectDetails.productImage = productImage,
            projectDetails.price = price,
            projectDetails.shortDescription = shortDescription,
            projectDetails.productUrl = productUrl,
            projectDetails.description = description,
            projectDetails.category = category,
            projectDetails.tags = tags,
            projectDetails.createdBy = createdBy,
            projectDetails.deletedAT = deletedAT,
            projectDetails.id = id

        const updateProject = await projectDetails.save();

        if (!updateProject) {
            throw new AppError(`Project not updated`, 500)
        }

        return res.status(200).json({
            status: "success",
            message: "Project updated Successfully",
            data: updateProject
        })

    });

const deleteProject = catchAsync(
    async (req, res, next) => {
        const userid = req.user.id;

        const { id } = req.params;

        let projectDetails = await project.findOne({ where: { id: id, createdBy: userid } });

        if (!projectDetails) {
            throw new AppError(`No project found with this id ${id} for user ${req.user.firstName}`, 400)
        }

        await projectDetails.destroy();

        return res.status(200).json({
            status: "success",
            message: "Project deleted Successfully"
        })

    });

module.exports = {
    createProject,
    getAllProject,
    getProjectById,
    getProjectByUserId,
    updateProject,
    deleteProject,
}

