local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/noowtf31-ui/Arcylic/refs/heads/main/src.lua.txt"))()

local window = Library.new("PHANTOM DNS")
window:SetToggleKey(Enum.KeyCode.RightControl)
window.container.Size = UDim2.new(0, 520, 0, 400)

window:Notify({
    Title = "Phantom DNS Loaded",
    Description = "Enjoy!",
    Duration = 5
})

local MainSection = window:CreateSection("Main")
local MiscSection = window:CreateSection("Misc")

local AutoTab = MainSection:CreateTab("Auto Cash/Coins")
local ExpTab = MainSection:CreateTab("Exp")
local OthersTab = MainSection:CreateTab("Others")
local JeepBoostTab = MiscSection:CreateTab("JeepBoost")
local ShopTab = MiscSection:CreateTab("Shop")
local TeleportTab = MiscSection:CreateTab("Teleport")
local AutoKmTab = MiscSection:CreateTab("Auto Km")

local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer

local CoinsEnabled = false
local CashEnabled = false
local ExperienceEnabled = false
local RepeatAmount = 55
local removeExpAmount = 1

local playerESP = false
local jeepneyESP = false
local espHighlights = {}

local topSpeed = 300
local boosting = false
local velocityObj = nil

local autoKmEnabled = false
local autoKmSpeed = 550

local selectedUnit = "Unit 1"

local function createHighlight(target, color)
    local highlight = Instance.new("Highlight")
    highlight.FillColor = color
    highlight.OutlineColor = color
    highlight.FillTransparency = 0.5
    highlight.OutlineTransparency = 0
    highlight.Adornee = target
    highlight.Parent = target
    return highlight
end

local function updatePlayerESP()
    for _, plr in Players:GetPlayers() do
        if plr ~= player and plr.Character then
            if playerESP then
                if not espHighlights[plr] then
                    espHighlights[plr] = createHighlight(plr.Character, Color3.fromRGB(255, 0, 0))
                end
            else
                if espHighlights[plr] then
                    espHighlights[plr]:Destroy()
                    espHighlights[plr] = nil
                end
            end
        end
    end
end

local function updateJeepneyESP()
    local jeepFolder = Workspace:FindFirstChild("Jeepnies")
    if jeepFolder then
        for _, jeep in jeepFolder:GetChildren() do
            if jeep:IsA("Model") then
                if jeepneyESP then
                    if not jeep:FindFirstChildOfClass("Highlight") then
                        createHighlight(jeep, Color3.fromRGB(0, 255, 255))
                    end
                else
                    local hl = jeep:FindFirstChildOfClass("Highlight")
                    if hl then hl:Destroy() end
                end
            end
        end
    end
end

RunService.RenderStepped:Connect(function()
    if playerESP then updatePlayerESP() end
    if jeepneyESP then updateJeepneyESP() end
end)

Players.PlayerRemoving:Connect(function(plr)
    if espHighlights[plr] then
        espHighlights[plr]:Destroy()
        espHighlights[plr] = nil
    end
end)

local mt = getrawmetatable(game)
local old = mt.__namecall
setreadonly(mt, false)

mt.__namecall = function(uh, ...)
    local args = {...}
    local method = getnamecallmethod()

    if uh.Name == "SayMessageRequest" then
        return old(uh, ...)
    end

    if ExperienceEnabled and (method == "FireServer" or method == "InvokeServer") then
        for i = 1, RepeatAmount do
            old(uh, unpack(args))
        end
    end

    return old(uh, unpack(args))
end

setreadonly(mt, true)

AutoTab:CreateToggle({
    Name = "Coins Farm",
    Default = false,
    Callback = function(enabled)
        CoinsEnabled = enabled
        if enabled then
            task.spawn(function()
                local remotes = ReplicatedStorage:WaitForChild("Remotes")
                local receiveCoin = remotes:WaitForChild("RecieveCoin")
                local jeepnies = game.Workspace:WaitForChild("Jeepnies")
                local jeepney = jeepnies:WaitForChild(player.Name)
                local passenger = jeepney:WaitForChild("PassengerValues")
                while CoinsEnabled do
                    receiveCoin:FireServer({
                        PassengerValues = passenger,
                        Password = 838875481,
                        Main = true,
                        Value = 300
                    })
                    task.wait(0.008)
                end
            end)
        end
    end
})

AutoTab:CreateToggle({
    Name = "Cash Farm",
    Default = false,
    Callback = function(enabled)
        CashEnabled = enabled
        if enabled then
            task.spawn(function()
                local target = ReplicatedStorage:WaitForChild("Remotes", 9e9):WaitForChild("RecieveCash", 9e9)
                while CashEnabled do
                    local totalFires = 2500
                    local chunkSize = 50
                    local fired = 0
                    while fired < totalFires and CashEnabled do
                        for i = 1, math.min(chunkSize, totalFires - fired) do
                            target:FireServer({
                                Value = 50,
                                Main = true,
                                Password = 724549130
                            })
                        end
                        fired = fired + chunkSize
                        task.wait(0.05)
                    end
                    task.wait(0.8)
                end
            end)
        end
    end
})

ExpTab:CreateToggle({
    Name = "100x exp",
    Default = false,
    Callback = function(enabled)
        ExperienceEnabled = enabled
    end
})

ExpTab:CreateSlider({
    Name = "Multiplier Repeat Amount",
    Min = 1,
    Max = 1000,
    Default = 55,
    Increment = 1,
    Callback = function(value)
        RepeatAmount = value
    end
})

ExpTab:CreateSlider({
    Name = "Remove Exp Amount",
    Min = 1,
    Max = 10000,
    Default = 1,
    Increment = 1,
    Callback = function(value)
        removeExpAmount = value
    end
})

ExpTab:CreateButton({
    Name = "Remove Exp",
    Callback = function()
        local remote = ReplicatedStorage:WaitForChild("Remotes", 9e9):WaitForChild("DeductExp", 9e9)
        remote:FireServer({
            Value = removeExpAmount,
            Password = 62199980
        })
    end
})

OthersTab:CreateToggle({
    Name = "Player ESP",
    Default = false,
    Callback = function(state)
        playerESP = state
    end
})

OthersTab:CreateToggle({
    Name = "Jeepney ESP",
    Default = false,
    Callback = function(state)
        jeepneyESP = state
    end
})

OthersTab:CreateButton({
    Name = "Remove AiVehicles",
    Callback = function()
        local aiFolder = Workspace:FindFirstChild("AiVehicles")
        if aiFolder then
            aiFolder:Destroy()
        end
    end
})

OthersTab:CreateDropdown({
    Name = "Select Unit",
    Options = {"Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"},
    Default = "Unit 1",
    Callback = function(choice)
        selectedUnit = choice
    end
})

OthersTab:CreateButton({
    Name = "Spawn Jeepney Unit",
    Callback = function()
        local args = {
            [1] = {
                ["UnitName"] = selectedUnit,
                ["JeepneyName"] = "Sarao Custombuilt Model 2",
                ["OperatorNpc"] = Workspace:WaitForChild("Map", 9e9):WaitForChild("Misc", 9e9):WaitForChild("Operators", 9e9):WaitForChild("Mang Juan", 9e9)
            }
        }
        pcall(function()
            ReplicatedStorage:WaitForChild("Remotes", 9e9):WaitForChild("SpawnOperatorNPCJeepney", 9e9):FireServer(unpack(args))
        end)
    end
})

JeepBoostTab:CreateSlider({
    Name = "Jeep Boost Speed",
    Min = 50,
    Max = 500,
    Default = 300,
    Increment = 10,
    Callback = function(value)
        topSpeed = value
    end
})

JeepBoostTab:CreateButton({
    Name = "START BOOST",
    Callback = function()
        if boosting then return end
        local jeepFolder = Workspace:FindFirstChild("Jeepnies")
        local jeep = jeepFolder and jeepFolder:FindFirstChild(player.Name)
        if jeep then
            local root = jeep.PrimaryPart or jeep:FindFirstChildWhichIsA("BasePart")
            if root then
                boosting = true
                if velocityObj and velocityObj.Parent then velocityObj:Destroy() end
                velocityObj = Instance.new("BodyVelocity")
                velocityObj.MaxForce = Vector3.new(1e6, 1e6, 1e6)
                velocityObj.Velocity = root.CFrame.LookVector * topSpeed
                velocityObj.Parent = root
                task.delay(3, function()
                    if velocityObj and velocityObj.Parent then
                        velocityObj:Destroy()
                        velocityObj = nil
                    end
                    boosting = false
                end)
            end
        end
    end
})

AutoKmTab:CreateSlider({
    Name = "Auto Km Speed",
    Min = 100,
    Max = 800,
    Default = 550,
    Increment = 10,
    Callback = function(value)
        autoKmSpeed = value
    end
})

AutoKmTab:CreateToggle({
    Name = "Auto Km",
    Default = false,
    Callback = function(enabled)
        autoKmEnabled = enabled
        if enabled then
            task.spawn(function()
                while autoKmEnabled do
                    local char = player.Character or player.CharacterAdded:Wait()
                    local hum = char:FindFirstChild("Humanoid")
                    if hum and hum.SeatPart then
                        local car = hum.SeatPart.Parent
                        local weightPart = car:FindFirstChild("Body") and car.Body:FindFirstChild("#Weight")
                        if weightPart then
                            car.PrimaryPart = weightPart
                        end
                        local carPrimaryPart = car.PrimaryPart or weightPart
                        if carPrimaryPart then
                            local location1 = Vector3.new(-6205.2983, 100, 8219.8535)
                            local location2 = Vector3.new(-7594.5410, 100, 5130.9526)

                            repeat
                                task.wait()
                                carPrimaryPart.Velocity = carPrimaryPart.CFrame.LookVector * autoKmSpeed
                                car:PivotTo(CFrame.new(carPrimaryPart.Position, location1))
                            until (char.PrimaryPart.Position - location1).Magnitude < 50 or not autoKmEnabled

                            carPrimaryPart.Velocity = Vector3.new(0,0,0)

                            repeat
                                task.wait()
                                carPrimaryPart.Velocity = carPrimaryPart.CFrame.LookVector * autoKmSpeed
                                car:PivotTo(CFrame.new(carPrimaryPart.Position, location2))
                            until (char.PrimaryPart.Position - location2).Magnitude < 50 or not autoKmEnabled

                            carPrimaryPart.Velocity = Vector3.new(0,0,0)
                        end
                    end
                    task.wait(0.1)
                end
            end)
        end
    end
})

local foodList = {"Isaw","Water","Calamares","Quek Quek","Betamax","Bloxy Cola","Hotdog","Burger"}

for _, food in ipairs(foodList) do
    ShopTab:CreateButton({
        Name = food,
        Callback = function()
            local args = {
                [1] = {
                    ["Password"] = 774910716,
                    ["FoodName"] = food
                }
            }
            pcall(function()
                ReplicatedStorage:WaitForChild("Remotes"):WaitForChild("BuyFood"):InvokeServer(unpack(args))
            end)
        end
    })
end

local locations = {
    ["Guiginto Terminal"] = Vector3.new(-137.74, 19, -3010.95),
    ["Guiginto Droppoint"] = Vector3.new(1056.62, 19, 3241.82),
    ["Drop off Bulakan - Guiguinto"] = Vector3.new(1049.858, 14.004, 3246.740),
    ["Talyer"] = Vector3.new(-430.981, 12.701, 620.724),
    ["Police Station"] = Vector3.new(1240.597, 12.863, 3211.784),
    ["Drop Off Guiguinto - Bulakan"] = Vector3.new(-1545, 13, -3470),
    ["Malolos"] = Vector3.new(17796, 13, -1104),
    ["Balagtas"] = Vector3.new(-3879, 14, 3482),
    ["Guiguinto"] = Vector3.new(822, 13, 3290),
    ["Bulakan Term - Balagtas"] = Vector3.new(-626, 16, -3202),
    ["Balagtas Term - Bulakan"] = Vector3.new(-3922, 17, 3156),
    ["Malolos Term - Bulakan"] = Vector3.new(17606, 16, -1195)
}

for name, pos in pairs(locations) do
    TeleportTab:CreateButton({
        Name = name,
        Callback = function()
            local jeepnies = Workspace:FindFirstChild("Jeepnies")
            local jeepney = jeepnies and jeepnies:FindFirstChild(player.Name)
            local cf = CFrame.new(pos)
            local _, yaw = cf:ToEulerAnglesYXZ()
            local flat = CFrame.new(pos) * CFrame.Angles(0, yaw, 0)
            if jeepney then
                jeepney:PivotTo(flat)
            elseif player.Character then
                player.Character:PivotTo(flat)
            end
        end
    })
end
