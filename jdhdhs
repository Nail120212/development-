local WindUI = loadstring(game:HttpGet("https://github.com/Footagesus/WindUI/releases/latest/download/main.lua"))()

local Window = WindUI:CreateWindow({
    Title = "PZ Hub – Escape tsunami for brainrots",
    Icon = "rocket",
    Size = UDim2.fromOffset(580, 400),
    Transparent = true,
    Theme = "Light",
    Resizable = true,
    SideBarWidth = 200,
    BackgroundImageTransparency = 0.42,
    HideSearchBar = false,
    ScrollBarEnabled = true
})

Window:IsResizable(true)
Window:ToggleTransparency(true)

Window:EditOpenButton({
    Title = "Open PZ Hub",
    CornerRadius = UDim.new(0,16),
    StrokeThickness = 2,
    Color = ColorSequence.new(
        Color3.fromHex("FF0F7B"),
        Color3.fromHex("F89B29")
    ),
    OnlyMobile = false,
    Enabled = true,
    Draggable = true
})

local MainTab = Window:Tab({
    Title = "Main",
    Icon = "house",
    Locked = false
})

local UpgradesTab = Window:Tab({
    Title = "Upgrades",
    Icon = "plus",
    Locked = false
})

local SellCollectTab = Window:Tab({
    Title = "Sell and Collect",
    Icon = "dollar-sign",
    Locked = false
})

local ServerTab = Window:Tab({
    Title = "Server",
    Icon = "server",
    Locked = false
})

local infJumpConnection = nil

MainTab:Toggle({
    Title = "Inf Jump",
    Default = false,
    Locked = false,
    Callback = function(state)
        if state then
            infJumpConnection = game:GetService("UserInputService").JumpRequest:Connect(function()
                local char = game.Players.LocalPlayer.Character
                if char and char:FindFirstChildOfClass("Humanoid") then
                    char:FindFirstChildOfClass("Humanoid"):ChangeState("Jumping")
                end
            end)
        else
            if infJumpConnection then
                infJumpConnection:Disconnect()
                infJumpConnection = nil
            end
        end
    end
})

MainTab:Toggle({
    Title = "Godmode",
    Default = false,
    Locked = false,
    Callback = function(state)
        local char = game.Players.LocalPlayer.Character
        if char and char:FindFirstChild("Humanoid") then
            char.Humanoid.MaxHealth = state and math.huge or 100
            char.Humanoid.Health = state and math.huge or 100
        end
    end
})

local instantCollectConnection = nil

MainTab:Toggle({
    Title = "Instant Collect Brainrot",
    Default = false,
    Locked = false,
    Callback = function(state)
        if state then
            instantCollectConnection = game:GetService("ProximityPromptService").PromptButtonHoldBegan:Connect(function(prompt)
                fireproximityprompt(prompt, 0)
            end)
        else
            if instantCollectConnection then
                instantCollectConnection:Disconnect()
                instantCollectConnection = nil
            end
        end
    end
})

UpgradesTab:Button({
    Title = "Upgrade Strength",
    Locked = false,
    Callback = function()
        local args = {}
        game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("UpgradeCarry", 9e9):InvokeServer(unpack(args))
    end
})

local speedUpgradeAmount = 1

UpgradesTab:Input({
    Title = "Upgrade Speed Amount",
    Value = "1",
    Placeholder = "Enter amount (1 to infinite)",
    Type = "Input",
    Callback = function(value)
        local num = tonumber(value)
        if num and num >= 1 then
            speedUpgradeAmount = num
        end
    end
})

UpgradesTab:Button({
    Title = "Upgrade Speed",
    Locked = false,
    Callback = function()
        local args = { speedUpgradeAmount }
        game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("UpgradeSpeed", 9e9):InvokeServer(unpack(args))
    end
})

UpgradesTab:Button({
    Title = "Upgrade Base",
    Locked = false,
    Callback = function()
        local args = {}
        game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("UpgradeBase", 9e9):InvokeServer(unpack(args))
    end
})

local autoRebirthEnabled = false

UpgradesTab:Toggle({
    Title = "Auto Rebirths",
    Default = false,
    Locked = false,
    Callback = function(state)
        autoRebirthEnabled = state
        if state then
            spawn(function()
                while autoRebirthEnabled do
                    local args = {}
                    game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("Rebirth", 9e9):InvokeServer(unpack(args))
                    task.wait(1)
                end
            end)
        end
    end
})

SellCollectTab:Button({
    Title = "Sell held tool",
    Locked = false,
    Callback = function()
        local args = {}
        game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("SellTool", 9e9):InvokeServer(unpack(args))
    end
})

local autoSellEnabled = false

SellCollectTab:Toggle({
    Title = "Auto sell all in inventory",
    Default = false,
    Locked = false,
    Callback = function(state)
        autoSellEnabled = state
        if state then
            spawn(function()
                while autoSellEnabled do
                    local args = {}
                    game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("SellAll", 9e9):InvokeServer(unpack(args))
                    task.wait(1)
                end
            end)
        end
    end
})

local autoUpgradeBrainrotEnabled = false

SellCollectTab:Toggle({
    Title = "Auto Upgrade Brainrot",
    Default = false,
    Locked = false,
    Callback = function(state)
        autoUpgradeBrainrotEnabled = state
        if state then
            spawn(function()
                while autoUpgradeBrainrotEnabled do
                    for slot = 1, 30 do
                        local args = { "Slot" .. slot }
                        game:GetService("ReplicatedStorage"):WaitForChild("RemoteFunctions", 9e9):WaitForChild("UpgradeBrainrot", 9e9):InvokeServer(unpack(args))
                    end
                    task.wait(0.5)
                end
            end)
        end
    end
})

local autoCollectCashEnabled = false

SellCollectTab:Toggle({
    Title = "Auto Collect Cash",
    Default = false,
    Locked = false,
    Callback = function(state)
        autoCollectCashEnabled = state
        if state then
            spawn(function()
                while autoCollectCashEnabled do
                    for slot = 1, 30 do
                        local args = { "Slot" .. slot }
                        game:GetService("ReplicatedStorage"):WaitForChild("RemoteEvents", 9e9):WaitForChild("CollectMoney", 9e9):FireServer(unpack(args))
                    end
                    task.wait(0.5)
                end
            end)
        end
    end
})

ServerTab:Button({
    Title = "Server Hop",
    Locked = false,
    Callback = function()
        game:GetService("TeleportService"):Teleport(game.PlaceId, game.Players.LocalPlayer)
    end
})

ServerTab:Button({
    Title = "Rejoin",
    Locked = false,
    Callback = function()
        game:GetService("TeleportService"):Teleport(game.PlaceId, game.Players.LocalPlayer)
    end
})

ServerTab:Button({
    Title = "Join to low playercount server",
    Locked = false,
    Callback = function()
        local servers = game.HttpService:JSONDecode(game:HttpGet("https://games.roblox.com/v1/games/" .. game.PlaceId .. "/servers/Public?sortOrder=Asc&limit=100"))
        local bestServer = nil
        local lowestPlayers = math.huge
        
        for _, server in ipairs(servers.data) do
            if server.playing < lowestPlayers and server.playing > 0 and server.id ~= game.JobId then
                lowestPlayers = server.playing
                bestServer = server
            end
        end
        
        if bestServer then
            game:GetService("TeleportService"):TeleportToPlaceInstance(game.PlaceId, bestServer.id, game.Players.LocalPlayer)
        else
            print("No suitable low player server found")
        end
    end
})
