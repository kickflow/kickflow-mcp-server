import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import pkg from '../package.json' with { type: 'json' }
import { Tool } from './types.js'

// Audit Log tools
import listAuditLogsTool from './kickflow-api/tools/audit-log/list-audit-logs.js'
// Category tools
import createCategoryTool from './kickflow-api/tools/category/create-category.js'
import updateCategoryTool from './kickflow-api/tools/category/update-category.js'
import listCategoriesTool from './kickflow-api/tools/category/list-categories.js'
import deleteCategoryTool from './kickflow-api/tools/category/delete-category.js'
// Folder tools
import listFoldersTool from './kickflow-api/tools/folder/list-folders.js'
import createFolderTool from './kickflow-api/tools/folder/create-folder.js'
import updateFolderTool from './kickflow-api/tools/folder/update-folder.js'
import getFolderTool from './kickflow-api/tools/folder/get-folder.js'
import deleteFolderTool from './kickflow-api/tools/folder/delete-folder.js'
// User tools
import getCurrentUserTool from './kickflow-api/tools/user/get-current-user.js'
import listUsersTool from './kickflow-api/tools/user/list-users.js'
import createUserTool from './kickflow-api/tools/user/create-user.js'
import getUserTool from './kickflow-api/tools/user/get-user.js'
import deleteUserTool from './kickflow-api/tools/user/delete-user.js'
import updateUserTool from './kickflow-api/tools/user/update-user.js'
import lookupUserByEmailTool from './kickflow-api/tools/user/lookup-user-by-email.js'
import reinviteUserTool from './kickflow-api/tools/user/reinvite-user.js'
import suspendUserTool from './kickflow-api/tools/user/suspend-user.js'
import reactivateUserTool from './kickflow-api/tools/user/reactivate-user.js'
import listUserTeamsTool from './kickflow-api/tools/user/list-user-teams.js'
import listUserRolesTool from './kickflow-api/tools/user/list-user-roles.js'
// Grade tools
import listGradesTool from './kickflow-api/tools/grade/list-grades.js'
import createGradeTool from './kickflow-api/tools/grade/create-grade.js'
import getGradeTool from './kickflow-api/tools/grade/get-grade.js'
import updateGradeTool from './kickflow-api/tools/grade/update-grade.js'
import deleteGradeTool from './kickflow-api/tools/grade/delete-grade.js'
import setDefaultGradeTool from './kickflow-api/tools/grade/set-default-grade.js'
// Proxy Applicant tools
import listProxyApplicantsTool from './kickflow-api/tools/proxy-applicant/list-proxy-applicants.js'
import createProxyApplicantTool from './kickflow-api/tools/proxy-applicant/create-proxy-applicant.js'
import deleteProxyApplicantTool from './kickflow-api/tools/proxy-applicant/delete-proxy-applicant.js'
// Proxy Approver tools
import listProxyApproversTool from './kickflow-api/tools/proxy-approver/list-proxy-approvers.js'
import createProxyApproverTool from './kickflow-api/tools/proxy-approver/create-proxy-approver.js'
import deleteProxyApproverTool from './kickflow-api/tools/proxy-approver/delete-proxy-approver.js'
// Organization Chart tools
import listOrganizationChartsTool from './kickflow-api/tools/organization-chart/list-organization-charts.js'
import createOrganizationChartTool from './kickflow-api/tools/organization-chart/create-organization-chart.js'
import getOrganizationChartTool from './kickflow-api/tools/organization-chart/get-organization-chart.js'
import updateOrganizationChartTool from './kickflow-api/tools/organization-chart/update-organization-chart.js'
import deleteOrganizationChartTool from './kickflow-api/tools/organization-chart/delete-organization-chart.js'
import getCurrentOrganizationChartTool from './kickflow-api/tools/organization-chart/get-current-organization-chart.js'
import activateOrganizationChartTool from './kickflow-api/tools/organization-chart/activate-organization-chart.js'
// Team tools
import listTeamsTool from './kickflow-api/tools/team/list-teams.js'
import createTeamTool from './kickflow-api/tools/team/create-team.js'
import getTeamTool from './kickflow-api/tools/team/get-team.js'
import updateTeamTool from './kickflow-api/tools/team/update-team.js'
import deleteTeamTool from './kickflow-api/tools/team/delete-team.js'
import listTeamMembersTool from './kickflow-api/tools/team/list-team-members.js'
import createTeamMembersTool from './kickflow-api/tools/team/create-team-members.js'
import deleteTeamMembersTool from './kickflow-api/tools/team/delete-team-members.js'
import updateTeamMemberTool from './kickflow-api/tools/team/update-team-member.js'
// General Master tools
import listGeneralMastersTool from './kickflow-api/tools/general-master/list-general-masters.js'
import createGeneralMasterTool from './kickflow-api/tools/general-master/create-general-master.js'
import getGeneralMasterTool from './kickflow-api/tools/general-master/get-general-master.js'
import updateGeneralMasterTool from './kickflow-api/tools/general-master/update-general-master.js'
import deleteGeneralMasterTool from './kickflow-api/tools/general-master/delete-general-master.js'
import listGeneralMasterItemsTool from './kickflow-api/tools/general-master/list-general-master-items.js'
import createGeneralMasterItemTool from './kickflow-api/tools/general-master/create-general-master-item.js'
import getGeneralMasterItemTool from './kickflow-api/tools/general-master/get-general-master-item.js'
import updateGeneralMasterItemTool from './kickflow-api/tools/general-master/update-general-master-item.js'
import deleteGeneralMasterItemTool from './kickflow-api/tools/general-master/delete-general-master-item.js'
// Route tools
import listRoutesTool from './kickflow-api/tools/route/list-routes.js'
import getRouteTool from './kickflow-api/tools/route/get-route.js'
// Workflow tools
import listWorkflowsTool from './kickflow-api/tools/workflow/list-workflows.js'
import getWorkflowTool from './kickflow-api/tools/workflow/get-workflow.js'
// Role tools
import listRolesTool from './kickflow-api/tools/role/list-roles.js'
import createRoleTool from './kickflow-api/tools/role/create-role.js'
import getRoleTool from './kickflow-api/tools/role/get-role.js'
import updateRoleTool from './kickflow-api/tools/role/update-role.js'
import deleteRoleTool from './kickflow-api/tools/role/delete-role.js'
import createRoleMembersTool from './kickflow-api/tools/role/create-role-members.js'
import listRoleMembersTool from './kickflow-api/tools/role/list-role-members.js'
import deleteRoleMemberTool from './kickflow-api/tools/role/delete-role-member.js'
// Ticket tools
import listTicketsTool from './kickflow-api/tools/ticket/list-tickets.js'
import createTicketTool from './kickflow-api/tools/ticket/create-ticket.js'
import listTasksTool from './kickflow-api/tools/ticket/list-tasks.js'
import getTicketTool from './kickflow-api/tools/ticket/get-ticket.js'
import updateTicketTool from './kickflow-api/tools/ticket/update-ticket.js'
import approveTicketTool from './kickflow-api/tools/ticket/approve-ticket.js'
import rejectTicketTool from './kickflow-api/tools/ticket/reject-ticket.js'
import denyTicketTool from './kickflow-api/tools/ticket/deny-ticket.js'
import withdrawTicketTool from './kickflow-api/tools/ticket/withdraw-ticket.js'
import archiveTicketTool from './kickflow-api/tools/ticket/archive-ticket.js'
import listTicketLinksTool from './kickflow-api/tools/ticket/list-ticket-links.js'
import listViewersTool from './kickflow-api/tools/ticket/list-viewers.js'
import createViewerTool from './kickflow-api/tools/ticket/create-viewer.js'
import deleteViewerTool from './kickflow-api/tools/ticket/delete-viewer.js'
// Comment tools
import listCommentsTool from './kickflow-api/tools/comment/list-comments.js'
import createCommentTool from './kickflow-api/tools/comment/create-comment.js'
import getCommentTool from './kickflow-api/tools/comment/get-comment.js'
import updateCommentTool from './kickflow-api/tools/comment/update-comment.js'
import deleteCommentTool from './kickflow-api/tools/comment/delete-comment.js'
// File tools
import uploadFileTool from './kickflow-api/tools/file/upload-file.js'
import getFileTool from './kickflow-api/tools/file/get-file.js'

// 全ツールの配列
export const tools: Tool[] = [
  // Audit Log tools
  listAuditLogsTool,
  // Category tools
  createCategoryTool,
  updateCategoryTool,
  listCategoriesTool,
  deleteCategoryTool,
  // Folder tools
  listFoldersTool,
  createFolderTool,
  updateFolderTool,
  getFolderTool,
  deleteFolderTool,
  // User tools
  getCurrentUserTool,
  listUsersTool,
  createUserTool,
  getUserTool,
  deleteUserTool,
  updateUserTool,
  lookupUserByEmailTool,
  reinviteUserTool,
  suspendUserTool,
  reactivateUserTool,
  listUserTeamsTool,
  listUserRolesTool,
  // Grade tools
  listGradesTool,
  createGradeTool,
  getGradeTool,
  updateGradeTool,
  deleteGradeTool,
  setDefaultGradeTool,
  // Proxy Applicant tools
  listProxyApplicantsTool,
  createProxyApplicantTool,
  deleteProxyApplicantTool,
  // Proxy Approver tools
  listProxyApproversTool,
  createProxyApproverTool,
  deleteProxyApproverTool,
  // Organization Chart tools
  listOrganizationChartsTool,
  createOrganizationChartTool,
  getOrganizationChartTool,
  updateOrganizationChartTool,
  deleteOrganizationChartTool,
  getCurrentOrganizationChartTool,
  activateOrganizationChartTool,
  // Team tools
  listTeamsTool,
  createTeamTool,
  getTeamTool,
  updateTeamTool,
  deleteTeamTool,
  listTeamMembersTool,
  createTeamMembersTool,
  deleteTeamMembersTool,
  updateTeamMemberTool,
  // General Master tools
  listGeneralMastersTool,
  createGeneralMasterTool,
  getGeneralMasterTool,
  updateGeneralMasterTool,
  deleteGeneralMasterTool,
  listGeneralMasterItemsTool,
  createGeneralMasterItemTool,
  getGeneralMasterItemTool,
  updateGeneralMasterItemTool,
  deleteGeneralMasterItemTool,
  // Route tools
  listRoutesTool,
  getRouteTool,
  // Workflow tools
  listWorkflowsTool,
  getWorkflowTool,
  // Role tools
  listRolesTool,
  createRoleTool,
  getRoleTool,
  updateRoleTool,
  deleteRoleTool,
  createRoleMembersTool,
  listRoleMembersTool,
  deleteRoleMemberTool,
  // Ticket tools
  listTicketsTool,
  createTicketTool,
  listTasksTool,
  getTicketTool,
  updateTicketTool,
  approveTicketTool,
  rejectTicketTool,
  denyTicketTool,
  withdrawTicketTool,
  archiveTicketTool,
  listTicketLinksTool,
  listViewersTool,
  createViewerTool,
  deleteViewerTool,
  // Comment tools
  listCommentsTool,
  createCommentTool,
  getCommentTool,
  updateCommentTool,
  deleteCommentTool,
  // File tools
  uploadFileTool,
  getFileTool,
]

export function createServer(): McpServer {
  const server = new McpServer(
    {
      name: 'kickflow',
      version: pkg.version,
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    },
  )

  // Register all tools
  tools.forEach((tool) => {
    server.tool(tool.name, tool.description, tool.paramsSchema, tool.cb)
  })

  return server
}
